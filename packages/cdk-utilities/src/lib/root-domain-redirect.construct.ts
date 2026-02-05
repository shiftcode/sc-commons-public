import { RemovalPolicy } from 'aws-cdk-lib'
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import {
  CloudFrontWebDistribution,
  HttpVersion,
  OriginProtocolPolicy,
  PriceClass,
  SecurityPolicyProtocol,
  SSLMethod,
  ViewerCertificate,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront'
import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { Bucket, IBucket, RedirectProtocol } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export interface RootDomainRedirectProps {
  /**
   * the root domain name like `example.com`
   */
  domain: string

  /**
   * the hosted zone for the rootdomain in which the dns record is created
   */
  hostedZone: IHostedZone

  /**
   * the certificate for the cloudfront
   * needs to include the root domain
   * location of cert needs to be us-east-1
   */
  certificate: ICertificate

  /**
   * the subdomain the redirects points to
   * default www
   */
  targetSubdomain?: string

  /**
   * the name of the bucket for the redirect
   * default generated like `example-com-www-redirect
   */
  bucketName?: string
}

/**
 * creates a root redirect for a domain to its target subdomain (default www)
 * redirects http in on step to https://www. (instead of http -> https -> www.)
 * http://shiftcode.ch -> https://www.shiftcode.ch
 * https://shiftcode.ch -> https://www.shiftcode.ch
 * creates the following Resources: DnsRecord -> CfDistribution -> S3 Bucket
 */
export class RootDomainRedirect extends Construct {
  readonly redirectBucket: Bucket
  readonly cfDistribution: CloudFrontWebDistribution
  readonly dnsRecord: ARecord

  constructor(
    scope: Construct,
    id: string,
    readonly props: RootDomainRedirectProps,
  ) {
    super(scope, id)

    const targetSubdomain = props.targetSubdomain || 'www'
    const bucketName = props.bucketName || `${props.domain.replace('.', '-')}-${targetSubdomain}-redirect`

    this.redirectBucket = this.createBucket(bucketName, props.domain, targetSubdomain)
    this.cfDistribution = this.createCfDistribution(props.domain, props.certificate, this.redirectBucket)
    this.dnsRecord = this.createDnsRecord(props.domain, props.hostedZone, this.cfDistribution)
  }

  private createBucket(bucketName: string, domain: string, targetSubdomain: string) {
    return new Bucket(this, 'Bucket', {
      bucketName,
      publicReadAccess: true,
      websiteRedirect: {
        hostName: `${targetSubdomain}.${domain}`,
        protocol: RedirectProtocol.HTTPS,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })
  }

  private createCfDistribution(domain: string, certificate: ICertificate, bucket: IBucket) {
    return new CloudFrontWebDistribution(this, 'CloudFrontDistribution', {
      comment: `root domain redirect for ${domain}`,
      defaultRootObject: '',
      priceClass: PriceClass.PRICE_CLASS_ALL,
      httpVersion: HttpVersion.HTTP2,
      viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: [domain],
        sslMethod: SSLMethod.SNI,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2019,
      }),
      originConfigs: [
        {
          customOriginSource: {
            domainName: bucket.bucketWebsiteDomainName,
            originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      // s3 will redirect to https // prevents having 2 redirects (cf+s3)
      viewerProtocolPolicy: ViewerProtocolPolicy.ALLOW_ALL,
    })
  }

  private createDnsRecord(domain: string, hostedZone: IHostedZone, cfDistribution: CloudFrontWebDistribution) {
    return new ARecord(this, 'AliasRecord', {
      recordName: domain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(cfDistribution)),
      zone: hostedZone,
    })
  }
}
