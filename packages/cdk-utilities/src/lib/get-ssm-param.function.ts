import { Stack } from 'aws-cdk-lib'
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources'
import pascalCase from 'just-pascal-case'

/**
 * creates a customResource to get an SSM Param value from a specific region.
 */
export function getSsmParam(scope: Stack, region: string, paramName: string): string {
  const paramRequest = new AwsCustomResource(scope, pascalCase(`GetSsmParameter-${region}-${paramName}`), {
    /* will also be called for a CREATE event */
    onUpdate: {
      service: 'SSM',
      action: 'getParameter',
      parameters: {
        Name: paramName,
      },
      region,
      // Update physical id to always fetch the latest version
      physicalResourceId: PhysicalResourceId.of(Date.now().toString()),
    },
    policy: AwsCustomResourcePolicy.fromSdkCalls({ resources: AwsCustomResourcePolicy.ANY_RESOURCE }),
  })
  return paramRequest.getResponseField('Parameter.Value')
}
