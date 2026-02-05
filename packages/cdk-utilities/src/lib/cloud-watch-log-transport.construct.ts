import { CfnOutput } from 'aws-cdk-lib'
import {
  AwsIntegration,
  BasePathMapping,
  Cors,
  DomainName,
  EndpointType,
  PassthroughBehavior,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway'
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { ILogGroup } from 'aws-cdk-lib/aws-logs'
import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { ApiGatewayDomain } from 'aws-cdk-lib/aws-route53-targets'
import { Construct } from 'constructs'

export interface DomainConfig {
  hostedZone: IHostedZone
  /**
   * use a certificate which is created outside the stack.
   * Otherwise, we cannot delete the stack, since the ApiGateway uses a hidden resource (ALB) that uses the certificate.
   * This hidden resource releases the certificate delayed, which prevents the certificate from being deleted as it is still in used
   */
  certificate: ICertificate
  subdomain: string
}

export interface CloudWatchLogTransportProps {
  logGroup: ILogGroup
  stackName: string
  domainConfig?: DomainConfig
  allowedOrigins?: string[]
  endpointType?: EndpointType
}

/**
 * @deprecated use {@link CloudWatchApi} instead.
 */
export class CloudWatchLogTransportConstruct extends Construct {
  readonly logApiUrl: string
  readonly createLogStreamApiUrl: string

  constructor(
    scope: Construct,
    id: string,
    readonly props: CloudWatchLogTransportProps,
  ) {
    super(scope, id)

    const apiRole = new Role(this, 'ApiGatewayCloudWatchRole', {
      assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
    })
    props.logGroup.grantWrite(apiRole)

    const api = new RestApi(this, 'FrontendLogApi', {
      restApiName: `${this.props.stackName}-FrontendLogApi`,
      endpointConfiguration: {
        types: [props.endpointType ?? EndpointType.REGIONAL],
      },
      defaultCorsPreflightOptions: {
        allowOrigins: props.allowedOrigins ?? Cors.ALL_ORIGINS,
        allowMethods: ['POST'],
        allowHeaders: ['Content-Type'],
      },
    })

    const allowedOrigin = props.allowedOrigins?.length === 1 ? props.allowedOrigins[0] : '*'

    const logIntegration = new AwsIntegration({
      service: 'logs',
      action: 'PutLogEvents',
      integrationHttpMethod: 'POST',
      options: {
        credentialsRole: apiRole,
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestParameters: {
          'integration.request.header.X-Amz-Target': "'Logs_20140328.PutLogEvents'",
          'integration.request.header.Content-Type': "'application/x-amz-json-1.1'",
        },
        integrationResponses: [
          {
            statusCode: '200',
            responseParameters: {
              'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'`,
            },
          },
          {
            statusCode: '400',
            responseParameters: {
              'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'`,
            },
            selectionPattern: '4\\d{2}',
            responseTemplates: {
              'application/json': `{
                "error": "$input.path('$.__type')",
                "message": "$input.path('$.message')"
              }`,
            },
          },
          {
            statusCode: '500',
            responseParameters: {
              'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'`,
            },
            selectionPattern: '5\\d{2}',
          },
        ],
        requestTemplates: {
          'application/json': `{
            "logGroupName": "${props.logGroup.logGroupName}",
            "logStreamName": $input.json('$.logStreamName'),
            "logEvents": [
              {
                "timestamp": $input.json('$.timestamp'),
                "message": $input.json('$.message')
              }
            ]
          }`,
        },
      },
    })

    const createStreamIntegration = new AwsIntegration({
      service: 'logs',
      action: 'CreateLogStream',
      integrationHttpMethod: 'POST',
      options: {
        credentialsRole: apiRole,
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestParameters: {
          'integration.request.header.X-Amz-Target': "'Logs_20140328.CreateLogStream'",
          'integration.request.header.Content-Type': "'application/x-amz-json-1.1'",
        },
        integrationResponses: [
          {
            statusCode: '200',
            responseParameters: {
              'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'`,
            },
            selectionPattern: '2\\d{2}',
          },
          {
            statusCode: '400',
            responseParameters: {
              'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'`,
            },
            selectionPattern: '4\\d{2}',
            responseTemplates: {
              'application/json': `{
                "error": "$input.path('$.__type')",
                "message": "$input.path('$.message')"
              }`,
            },
          },
          {
            statusCode: '500',
            responseParameters: {
              'method.response.header.Access-Control-Allow-Origin': `'${allowedOrigin}'`,
            },
            selectionPattern: '5\\d{2}',
          },
        ],
        requestTemplates: {
          'application/json': `{
            "logGroupName": "${props.logGroup.logGroupName}",
            "logStreamName": $input.json('$.logStreamName')
          }`,
        },
      },
    })

    const logsResource = api.root.addResource('log')
    logsResource.addMethod('POST', logIntegration, {
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true,
          },
        },
        {
          statusCode: '400',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true,
          },
        },
        {
          statusCode: '500',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true,
          },
        },
      ],
    })

    const createStreamResource = api.root.addResource('create-stream')
    createStreamResource.addMethod('POST', createStreamIntegration, {
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true,
          },
        },
        {
          statusCode: '400',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true,
          },
        },
        {
          statusCode: '500',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true,
          },
        },
      ],
    })

    if (this.props.domainConfig) {
      const domainConfig = this.props.domainConfig
      const zoneName = domainConfig.hostedZone.zoneName.replace(/\.$/, '')
      const domainName = `${domainConfig.subdomain}.${zoneName}`
      const domain = new DomainName(this, 'ApiCustomDomain', {
        domainName,
        certificate: domainConfig.certificate,
        endpointType: props.endpointType ?? EndpointType.REGIONAL,
      })

      new BasePathMapping(this, 'BasePathMapping', {
        domainName: domain,
        restApi: api,
        basePath: '',
      })

      new ARecord(this, 'ApiDomainAliasRecord', {
        zone: domainConfig.hostedZone,
        recordName: domainConfig.subdomain,
        target: RecordTarget.fromAlias(new ApiGatewayDomain(domain)),
      })

      this.logApiUrl = `https://${domainName}/log`
      this.createLogStreamApiUrl = `https://${domainName}/create-stream`
    } else {
      this.logApiUrl = api.urlForPath('/log')
      this.createLogStreamApiUrl = api.urlForPath('/create-stream')
    }

    new CfnOutput(this, 'LogEndpointUrl', {
      value: this.logApiUrl,
    })
    new CfnOutput(this, 'CreateStreamEndpointUrl', {
      value: this.createLogStreamApiUrl,
    })
  }
}
