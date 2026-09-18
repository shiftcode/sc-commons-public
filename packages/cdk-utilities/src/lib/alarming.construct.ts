import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { BundleInfo, handlerToBundleInfo } from '@shiftcode/iac-utilities'
import { Duration, Stack } from 'aws-cdk-lib'
import { Alarm, ComparisonOperator, IMetric, TreatMissingData } from 'aws-cdk-lib/aws-cloudwatch'
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions'
import { Secret } from 'aws-cdk-lib/aws-ecs'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Code, Function as LambdaFunction, IFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { ILogGroup } from 'aws-cdk-lib/aws-logs'
import { LambdaDestination } from 'aws-cdk-lib/aws-logs-destinations'
import { Topic } from 'aws-cdk-lib/aws-sns'
import { EmailSubscription, LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'

import { LambdaFunctionName } from './lambda-function-name.enum.js'

// the compiled location of this file, i.e. `dist/lib/` - also the root of the compiled lambda
// sources referenced by `LambdaFunctionName` (`dist/lib/functions/*.js`)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const esbuildOutDir = join(__dirname, '../esbuild')

/**
 * Metadata embedded into an alarm's description. Consumed by the bundled
 * publish-alarm-to-slack lambda to correlate an alarm with its log group.
 */
export interface AlarmMetadata {
  readonly region: string
  readonly description: string
  readonly logGroupName?: string
}

export interface AddMetricAlarmProps {
  /** construct id, also used to derive the alarm name if `alarmName` is not given */
  id: string
  metric: IMetric
  alarmName?: string
  description?: string
  threshold?: number
  comparisonOperator?: ComparisonOperator
  evaluationPeriods?: number
  treatMissingData?: TreatMissingData
  /** set if the alarmed resource has an associated log group, for correlation in notifications */
  logGroupName?: string
}

export interface AddLogErrorSubscriptionProps {
  id: string
  logGroup: ILogGroup
  /** CloudWatch Logs JSON filter pattern string, defaults to matching structured `level: "ERROR"` logs */
  filterPattern?: string
  /** optional explicit CloudWatch Logs subscription filter name */
  filterName?: string
  addPermissions?: boolean
}

export interface SetupLambdaAlarmProps {
  /** @default true */
  addErrorLogSubscription?: boolean
  /** @default true */
  addThrottlesAlarm?: boolean
}

export interface AlarmingConstructProps {
  /** SSM (SecureString) parameter name holding the Slack incoming-webhook URL */
  slackWebhookEndpointSsmParamKey: string
  /** notified by email if the bundled notification lambdas themselves start failing */
  fallbackAlarmEmail: string
  /** @default `${stackName}-AlarmTopic` */
  alarmTopicName?: string
}

/**
 * Generic, drop-in CloudWatch alarming construct. Bundles its own Slack-notification lambdas
 * (code ships as part of this library), so consumers only need to pass the props below - no
 * lambda code/bundling of their own required.
 *
 * Provides:
 * - a shared SNS topic that all alarms publish to
 * - `PublishAlarmToSlack` lambda, subscribed to that topic, posting alarm state changes to Slack
 * - `PublishErrorLogsToSlack` lambda, used as the destination for `addLogErrorSubscription`,
 *   posting structured ERROR log lines to Slack
 * - `addMetricAlarm` / `addLogErrorSubscription` / `setupAlarmForLambda` to wire up alarms for
 *   any CloudWatch metric or log group (Lambda, Fargate, Neptune, RDS, SQS, ALB, ...)
 * - a fallback alarm + email per notification lambda, guarding against the alerting pipeline
 *   itself failing silently
 */
export class AlarmingConstruct extends Construct {
  readonly alarmTopic: Topic
  readonly publishAlarmToSlackFunction: LambdaFunction
  readonly publishErrorLogsToSlackFunction: LambdaFunction

  private readonly fallbackAlarmEmail: string

  constructor(scope: Construct, id: string, props: AlarmingConstructProps) {
    super(scope, id)

    this.fallbackAlarmEmail = props.fallbackAlarmEmail

    this.alarmTopic = new Topic(this, 'AlarmTopic', {
      displayName: 'Alarm Topic',
      topicName: props.alarmTopicName ?? `${Stack.of(this).stackName}-AlarmTopic`,
    })

    const slackWebhookApiSecret = Secret.fromSsmParameter(
      StringParameter.fromSecureStringParameterAttributes(this, 'SlackWebhookEndpoint', {
        parameterName: props.slackWebhookEndpointSsmParamKey,
      }),
    )

    this.publishAlarmToSlackFunction = this.createPublishAlarmToSlackLambda(slackWebhookApiSecret)
    this.publishErrorLogsToSlackFunction = this.createPublishErrorLogsToSlackLambda(slackWebhookApiSecret)
  }

  /**
   * Creates a CloudWatch Alarm on any metric and routes it to the shared alarm topic (and
   * therefore to `publishAlarmToSlackFunction`). Use this for Lambda errors, Fargate CPU/memory,
   * Neptune connections, SQS queue depth, ALB 5xx, etc.
   */
  addMetricAlarm(scope: Construct, props: AddMetricAlarmProps): Alarm {
    const alarmName = props.alarmName ?? `${Stack.of(scope).stackName}-${props.id}`

    const metadata: AlarmMetadata = {
      region: Stack.of(scope).region,
      description: props.description ?? `Alarm for ${alarmName}`,
      logGroupName: props.logGroupName,
    }

    const alarm = new Alarm(scope, props.id, {
      alarmName,
      alarmDescription: JSON.stringify(metadata),
      metric: props.metric,
      threshold: props.threshold ?? 1,
      comparisonOperator: props.comparisonOperator ?? ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: props.evaluationPeriods ?? 1,
      treatMissingData: props.treatMissingData ?? TreatMissingData.NOT_BREACHING,
    })

    // import the topic by ARN (rather than referencing `this.alarmTopic` directly) to avoid
    // CloudFormation cross-stack export/import coupling when `scope` lives in a different stack
    // than this construct. see https://github.com/aws/aws-cdk/issues/28936
    const topic = Topic.fromTopicAttributes(scope, `${props.id}Topic`, {
      topicArn: this.alarmTopic.topicArn,
    })
    alarm.addAlarmAction(new SnsAction(topic))

    return alarm
  }

  /**
   * Subscribes `publishErrorLogsToSlackFunction` to a log group's error events, filtering for
   * structured JSON log lines (defaults to `{ $.level = "ERROR" }`). Works for any service
   * writing to a CloudWatch log group (Lambda, ECS/Fargate via the awslogs driver, etc.).
   */
  addLogErrorSubscription(scope: Construct, props: AddLogErrorSubscriptionProps): void {
    // using function attributes rather than the direct reference to avoid cross-stack CFN
    // export/import churn, see https://github.com/aws/aws-cdk/issues/28936
    const destination = LambdaFunction.fromFunctionAttributes(scope, `${props.id}Destination`, {
      functionArn: this.publishErrorLogsToSlackFunction.functionArn,
      sameEnvironment: true,
    })

    props.logGroup.addSubscriptionFilter(props.id, {
      destination: new LambdaDestination(destination, {
        addPermissions: props.addPermissions ?? true,
      }),
      filterPattern: {
        logPatternString: props.filterPattern ?? '{ $.level = "ERROR" }',
      },
      filterName: props.filterName ?? `Error log subscription filter for ${props.logGroup.logGroupName}`,
    })
  }

  /**
   * Convenience wrapper combining common lambda alarms.
   * Error alarm is always enabled, while log subscription and throttles can be disabled via `props`.
   */
  setupAlarmForLambda(scope: Construct, lambda: LambdaFunction, props: SetupLambdaAlarmProps = {}): void {
    // using node ID because this cannot contain references
    const baseName = lambda.node.id

    if (props.addErrorLogSubscription ?? true) {
      this.addLogErrorSubscription(scope, {
        id: `${baseName}ErrorLogsSubscriptionFilter`,
        logGroup: lambda.logGroup,
      })
    }

    this.addMetricAlarm(scope, {
      id: `${baseName}ErrorsAlarm`,
      metric: lambda.metricErrors(),
      logGroupName: lambda.logGroup.logGroupName,
      description: `Error alarm for log group ${lambda.logGroup.logGroupName}`,
    })

    if (props.addThrottlesAlarm ?? true) {
      this.addMetricAlarm(scope, {
        id: `${baseName}ThrottlesAlarm`,
        metric: lambda.metricThrottles(),
        logGroupName: lambda.logGroup.logGroupName,
        description: `Throttle alarm for log group ${lambda.logGroup.logGroupName}`,
      })
    }
  }

  private createPublishAlarmToSlackLambda(slackWebhookApiSecret: Secret): LambdaFunction {
    const functionName = `${Stack.of(this).stackName}-publish-alarm-to-slack-fn`
    const lambdaFunction = this.createNotificationLambda('PublishAlarmToSlackLambda', functionName, {
      bundleInfo: handlerToBundleInfo(LambdaFunctionName.PUBLISH_ALARM_TO_SLACK, __dirname, esbuildOutDir),
      slackWebhookApiSecret,
      // enriches alarm notifications with recent log events of the correlated log group
      needsLogsReadAccess: true,
    })

    this.alarmTopic.addSubscription(new LambdaSubscription(lambdaFunction))
    this.setupFallbackAlarm(lambdaFunction, functionName)

    return lambdaFunction
  }

  private createPublishErrorLogsToSlackLambda(slackWebhookApiSecret: Secret): LambdaFunction {
    const functionName = `${Stack.of(this).stackName}-publish-error-logs-to-slack-fn`
    const lambdaFunction = this.createNotificationLambda('PublishErrorLogsToSlackLambda', functionName, {
      bundleInfo: handlerToBundleInfo(LambdaFunctionName.PUBLISH_ERROR_LOGS_TO_SLACK, __dirname, esbuildOutDir),
      slackWebhookApiSecret,
    })

    this.setupFallbackAlarm(lambdaFunction, functionName)

    return lambdaFunction
  }

  private createNotificationLambda(
    constructId: string,
    functionName: string,
    opts: { bundleInfo: BundleInfo; slackWebhookApiSecret: Secret; needsLogsReadAccess?: boolean },
  ): LambdaFunction {
    const lambdaFunction = new LambdaFunction(this, constructId, {
      code: Code.fromAsset(opts.bundleInfo.outPath),
      handler: `${opts.bundleInfo.baseFilename}.${opts.bundleInfo.handlerName}`,
      functionName,
      runtime: Runtime.NODEJS_24_X,
      environment: {
        SLACK_WEBHOOK_ENDPOINT_SSM_PARAM_ARN: opts.slackWebhookApiSecret.arn,
      },
      timeout: Duration.seconds(30),
    })

    // grant read access to the slack webhook secret
    opts.slackWebhookApiSecret.grantRead(lambdaFunction)

    if (opts.needsLogsReadAccess) {
      // grant access to fetch log events for enriching alarm notifications
      lambdaFunction.addToRolePolicy(
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['logs:FilterLogEvents'],
          resources: ['*'], // TODO be more restrictive here
        }),
      )
    }

    return lambdaFunction
  }

  /**
   * If a notification lambda (alarm forwarder or log forwarder) fails itself, the normal alarm
   * pipeline can't be trusted to report it. This sets up an independent alarm on that lambda's
   * own error metric with a direct email subscription, bypassing the shared topic entirely.
   */
  private setupFallbackAlarm(lambdaFunction: IFunction, baseName: string): void {
    const topicName = `${baseName}FallbackAlarmTopic`
    const topic = new Topic(this, topicName, {
      displayName: `Fallback Alarming Topic for ${baseName}`,
      topicName,
    })

    const alarmName = `${baseName}FallbackAlarm`
    const alarm = new Alarm(this, alarmName, {
      alarmName,
      alarmDescription: `Fallback Alarm for ${baseName}`,
      metric: lambdaFunction.metricErrors(),
      threshold: 1,
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      treatMissingData: TreatMissingData.NOT_BREACHING,
    })

    alarm.addAlarmAction(new SnsAction(topic))
    topic.addSubscription(new EmailSubscription(this.fallbackAlarmEmail))
  }
}
