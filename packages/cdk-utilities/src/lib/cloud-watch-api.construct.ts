import { Stack } from 'aws-cdk-lib'
import {
  AwsIntegration,
  BasePathMapping,
  Cors,
  DomainName,
  EndpointType,
  IRestApi,
  JsonSchemaType,
  Model,
  PassthroughBehavior,
  RequestValidator,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway'
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import { PolicyDocument, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { ILogGroup } from 'aws-cdk-lib/aws-logs'
import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { ApiGatewayDomain } from 'aws-cdk-lib/aws-route53-targets'
import { Construct } from 'constructs'

export interface CloudWatchApiProps {
  logGroup: ILogGroup

  /** @default {@link EndpointType.REGIONAL} */
  endpointType?: EndpointType

  /**
   * allowed origins for CORS configuration
   * @default {@link Cors.ALL_ORIGINS}
   */
  allowedOrigins?: string[]

  domainConfig?: {
    hostedZone: IHostedZone
    /**
     * use a certificate which is created outside the stack.
     * Otherwise, we cannot delete the stack, since the ApiGateway uses a hidden resource (ALB) that uses the certificate.
     * This hidden resource releases the certificate delayed, which prevents the certificate from being deleted as it is still in used
     */
    certificate: ICertificate
    subdomain: string
  }

  /**
   * resource name of the api gateway rest api
   * @default `${stackName}-cloudwatch-api`
   */
  restApiName?: string
}

type DomainConfig = NonNullable<CloudWatchApiProps['domainConfig']>

const enum PathPart {
  STREAMS = 'streams',
  LOGS = 'logs',
}

const enum PathParam {
  LOG_STREAM_NAME = 'logStreamName',
}

/**
 * creates an API Gateway REST API to interact with CloudWatch Logs.
 * exposes the following endpoints:
 * - POST /streams: create a new log stream (body: { logStreamName: string })
 * - GET  /streams/{logStreamName}: describe a log stream
 * - POST /streams/{logStreamName}/logs: put log events to a log stream (body: { logEvents: Array<{ message: string, timestamp: number }> })
 */
export class CloudWatchApi extends Construct {
  readonly api: RestApi
  readonly role: Role
  readonly domain?: DomainName
  readonly url: string

  constructor(
    scope: Construct,
    id: string,
    protected readonly props: CloudWatchApiProps,
  ) {
    super(scope, id)

    this.role = this.createRole(this.props.logGroup)
    this.api = this.createApi(this.role)

    if (this.props.domainConfig) {
      const [domain] = this.addDomainToApi(this.api, this.props.domainConfig)
      this.domain = domain
      this.url = `https://${domain.domainName}`
    } else {
      this.url = this.api.url
    }
  }

  private createRole(logGroup: ILogGroup): Role {
    return new Role(this, 'ApiGatewayCloudWatchRole', {
      assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
      inlinePolicies: {
        logsPolicy: new PolicyDocument({
          statements: [
            new PolicyStatement({
              actions: ['logs:CreateLogStream', 'logs:DescribeLogStreams', 'logs:PutLogEvents'],

              resources: [logGroup.logGroupArn, `${logGroup.logGroupArn}:log-stream:*`],
            }),
          ],
        }),
      },
    })
  }

  private createApi(apiIntegrationRole: Role): RestApi {
    const api = new RestApi(this, 'FrontendLogApi', {
      restApiName: this.props.restApiName ?? `${Stack.of(this).stackName}-cloudwatch-api`,
      endpointConfiguration: { types: [this.props.endpointType ?? EndpointType.REGIONAL] },
      defaultCorsPreflightOptions: {
        allowOrigins: this.props.allowedOrigins ?? Cors.ALL_ORIGINS,
        allowMethods: ['GET', 'POST'],
        allowHeaders: ['Content-Type'],
      },
    })

    const errorResponseModel: Model = api.addModel('ErrorResponseModel', {
      modelName: 'ErrorDto',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          code: { type: JsonSchemaType.STRING },
          message: { type: JsonSchemaType.STRING },
        },
        required: ['code', 'message'],
        additionalProperties: false,
      },
    })

    const bodyRequestValidator = new RequestValidator(this, 'BodyRequestValidator', {
      requestValidatorName: 'Body Validator',
      restApi: api,
      validateRequestBody: true,
    })

    const streams = api.root.addResource(PathPart.STREAMS)
    const stream = streams.addResource(`{${PathParam.LOG_STREAM_NAME}}`)
    const streamLogs = stream.addResource(PathPart.LOGS)

    const allowedOrigin = this.props.allowedOrigins?.length === 1 ? this.props.allowedOrigins[0] : '*'

    //
    // CREATE LOG STREAM
    //
    const logStreamCreateModel: Model = api.addModel('LogStreamCreateModel', {
      modelName: 'LogStreamCreateDto',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          logStreamName: {
            type: JsonSchemaType.STRING,
            pattern: '^[a-zA-Z0-9-_]{16,512}$',
          },
        },
        required: ['logStreamName'],
        additionalProperties: false,
      },
    })
    const createLogStreamIntegration = new AwsIntegration({
      service: 'logs',
      action: 'CreateLogStream',
      integrationHttpMethod: 'POST',
      options: {
        credentialsRole: apiIntegrationRole,
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestParameters: {
          'integration.request.header.X-Amz-Target': `'Logs_20140328.CreateLogStream'`,
          'integration.request.header.Content-Type': `'application/x-amz-json-1.1'`,
        },
        requestTemplates: {
          'application/json': `{
            "logGroupName": "${this.props.logGroup.logGroupName}",
            "logStreamName": $input.json('$.logStreamName')
          }`,
        },
        integrationResponses: [
          {
            selectionPattern: '2\\d{2}',
            statusCode: '201',
            responseParameters: { 'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'` },
            responseTemplates: { 'application/json': `#set($inputRoot = $input.path('$'))` },
          },
          {
            selectionPattern: '4\\d{2}',
            statusCode: '400',
            responseParameters: { 'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'` },
            responseTemplates: {
              'application/json': `{
                "code": $input.json('$.__type'),
                "message": $input.json('$.message')
              }`,
            },
          },
          {
            selectionPattern: '5\\d{2}',
            statusCode: '500',
            responseParameters: { 'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'` },
          },
        ],
      },
    })
    streams.addMethod('POST', createLogStreamIntegration, {
      requestModels: { 'application/json': logStreamCreateModel },
      requestValidator: bodyRequestValidator,
      methodResponses: [
        {
          statusCode: '201',
          responseModels: { 'application/json': Model.EMPTY_MODEL },
          responseParameters: { 'method.response.header.Access-Control-Allow-Origin': true },
        },
        {
          statusCode: '400',
          responseModels: { 'application/json': errorResponseModel },
          responseParameters: { 'method.response.header.Access-Control-Allow-Origin': true },
        },
        {
          statusCode: '500',
          responseParameters: { 'method.response.header.Access-Control-Allow-Origin': true },
        },
      ],
    })

    //
    // DESCRIBE LOG STREAM
    //
    const logStreamDescribeModel: Model = api.addModel('LogStreamDescribeModel', {
      modelName: 'LogStreamDescribeDto',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          logStreamName: { type: JsonSchemaType.STRING },
          creationTime: { type: JsonSchemaType.NUMBER },
          lastIngestionTime: { type: [JsonSchemaType.NUMBER, JsonSchemaType.NULL] },
        },
        required: ['logStreamName', 'creationTime', 'lastIngestionTime'],
        additionalProperties: false,
      },
    })
    const describeLogStreamsIntegration = new AwsIntegration({
      service: 'logs',
      action: 'DescribeLogStreams',
      integrationHttpMethod: 'POST',
      options: {
        credentialsRole: apiIntegrationRole,
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestParameters: {
          'integration.request.header.Content-Type': `'application/x-amz-json-1.1'`,
          'integration.request.header.X-Amz-Target': `'Logs_20140328.DescribeLogStreams'`,
        },
        requestTemplates: {
          'application/json': `
          {
            "limit": 1,
            "logGroupName": "${this.props.logGroup.logGroupName}",
            "logStreamNamePrefix": "$input.params('${PathParam.LOG_STREAM_NAME}')"
          }`,
        },
        integrationResponses: [
          {
            selectionPattern: '2\\d{2}',
            statusCode: '200',
            responseParameters: { 'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'` },
            responseTemplates: {
              'application/json': `
#set($streams = $input.path('$.logStreams'))
#if($streams.size() > 0)
  {
   "logStreamName": "$streams[0].logStreamName",
   "creationTime": $streams[0].creationTime,
#if($streams[0].lastIngestionTime > 0)
   "lastIngestionTime": $streams[0].lastIngestionTime
#else
   "lastIngestionTime": null
#end
  }
#else
  #set($context.responseOverride.status = 404)
  {
    "code": "ResourceNotFoundException",
    "message": "The specified log stream does not exist."
  }
#end
          `,
            },
          },
          {
            selectionPattern: '4\\d{2}',
            statusCode: '400',
            responseParameters: { 'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'` },
          },
          {
            selectionPattern: '5\\d{2}',
            statusCode: '500',
            responseParameters: { 'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'` },
          },
        ],
      },
    })
    stream.addMethod('GET', describeLogStreamsIntegration, {
      methodResponses: [
        {
          statusCode: '200',
          responseModels: { 'application/json': logStreamDescribeModel },
          responseParameters: { 'method.response.header.Access-Control-Allow-Origin': true },
        },
        {
          statusCode: '404',
          responseModels: { 'application/json': errorResponseModel },
          responseParameters: { 'method.response.header.Access-Control-Allow-Origin': true },
        },
        {
          statusCode: '500',
          responseParameters: { 'method.response.header.Access-Control-Allow-Origin': true },
        },
      ],
    })

    //
    // PUT LOG EVENTS
    //
    const writeLogsModel = api.addModel('WriteLogsModel', {
      modelName: 'WriteLogsDto',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          logEvents: {
            type: JsonSchemaType.ARRAY,
            items: {
              type: JsonSchemaType.OBJECT,
              properties: {
                message: { type: JsonSchemaType.STRING },
                timestamp: { type: JsonSchemaType.NUMBER },
              },
              required: ['message', 'timestamp'],
              additionalProperties: false,
            },
          },
        },
        required: ['logEvents'],
        additionalProperties: false,
      },
    })
    const putLogEventsIntegration = new AwsIntegration({
      service: 'logs',
      action: 'PutLogEvents',
      integrationHttpMethod: 'POST',
      options: {
        credentialsRole: apiIntegrationRole,
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestParameters: {
          'integration.request.header.X-Amz-Target': `'Logs_20140328.PutLogEvents'`,
          'integration.request.header.Content-Type': `'application/x-amz-json-1.1'`,
        },
        requestTemplates: {
          'application/json': `{
            "logGroupName": "${this.props.logGroup.logGroupName}",
            "logStreamName": "$input.params('${PathParam.LOG_STREAM_NAME}')",
            "logEvents": $input.json('$.logEvents')
          }`,
        },
        integrationResponses: [
          {
            selectionPattern: '2\\d{2}',
            statusCode: '201',
            responseParameters: { 'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'` },
            responseTemplates: { 'application/json': `#set($inputRoot = $input.path('$'))` },
          },
          {
            selectionPattern: '4\\d{2}',
            statusCode: '400',
            responseParameters: { 'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'` },
            responseTemplates: {
              'application/json': `{
                "code": $input.json('$.__type'),
                "message": $input.json('$.message')
              }`,
            },
          },
          {
            selectionPattern: '5\\d{2}',
            statusCode: '500',
            responseParameters: { 'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'` },
          },
        ],
      },
    })
    streamLogs.addMethod('POST', putLogEventsIntegration, {
      requestModels: {
        'application/json': writeLogsModel,
      },
      requestValidator: bodyRequestValidator,
      methodResponses: [
        {
          statusCode: '201',
          responseModels: { 'application/json': Model.EMPTY_MODEL },
          responseParameters: { 'method.response.header.Access-Control-Allow-Origin': true },
        },
        {
          statusCode: '400',
          responseModels: { 'application/json': errorResponseModel },
          responseParameters: { 'method.response.header.Access-Control-Allow-Origin': true },
        },
        {
          statusCode: '500',
          responseParameters: { 'method.response.header.Access-Control-Allow-Origin': true },
        },
      ],
    })

    return api
  }

  private addDomainToApi(api: IRestApi, domainConfig: DomainConfig): [DomainName, ARecord] {
    const zoneName = domainConfig.hostedZone.zoneName.replace(/\.$/, '')
    const domainName = `${domainConfig.subdomain}.${zoneName}`

    const domain = new DomainName(this, 'ApiCustomDomain', {
      domainName,
      certificate: domainConfig.certificate,
      endpointType: this.props.endpointType ?? EndpointType.REGIONAL,
    })

    new BasePathMapping(this, 'BasePathMapping', {
      domainName: domain,
      restApi: api,
      basePath: '',
    })

    const record = new ARecord(this, 'ApiDomainAliasRecord', {
      zone: domainConfig.hostedZone,
      recordName: domainConfig.subdomain,
      target: RecordTarget.fromAlias(new ApiGatewayDomain(domain)),
    })

    return [domain, record]
  }
}
