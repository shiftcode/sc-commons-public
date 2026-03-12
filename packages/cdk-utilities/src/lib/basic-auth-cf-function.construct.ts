import {
  Function as CloudFrontFunction,
  FunctionCode,
  FunctionProps,
  FunctionRuntime,
} from 'aws-cdk-lib/aws-cloudfront'
import { Construct } from 'constructs'

import { createBasicAuthCfFn } from './utils/create-basic-auth-cf-fn.function.js'

export interface BasicAuthCloudFrontFunctionProps extends Omit<FunctionProps, 'code' | 'runtime'> {
  user: string
  password: string
}

/**
 * Simple CloudFrontFunction for {@link VIEWER_REQUEST} which will return `401 - Unauthorized` when not providing basic auth
 */
export class BasicAuthCloudFrontFunction extends CloudFrontFunction {
  constructor(scope: Construct, id: string, config: BasicAuthCloudFrontFunctionProps) {
    super(scope, id, {
      ...config,
      code: FunctionCode.fromInline(createBasicAuthCfFn(config.user, config.password)),
      runtime: FunctionRuntime.JS_2_0,
    })
  }
}
