import {
  Function as CloudFrontFunction,
  FunctionCode,
  FunctionProps,
  FunctionRuntime,
} from 'aws-cdk-lib/aws-cloudfront'
import { Construct } from 'constructs'

import { createLanguageRedirectCfFn } from './utils/create-language-redirect-cf.fn.js'

export interface LanguageRedirectCloudFrontFunctionProps<T extends string>
  extends Omit<FunctionProps, 'code' | 'runtime'> {
  languages: T[]
  fallback: NoInfer<T>
  /** default: 'LANGUAGE' */
  languageCookieName?: string
}

/**
 * CloudFrontFunction for language redirect
 * it will return a `302 - Found` redirecting to the preferred language path if not present as first path segment
 */
export class LanguageRedirectCloudFrontFunction<T extends string> extends CloudFrontFunction {
  constructor(scope: Construct, id: string, config: LanguageRedirectCloudFrontFunctionProps<T>) {
    super(scope, id, {
      ...config,
      code: FunctionCode.fromInline(
        createLanguageRedirectCfFn<T>(config.languages, config.fallback, config.languageCookieName),
      ),
      runtime: FunctionRuntime.JS_2_0,
    })
  }
}
