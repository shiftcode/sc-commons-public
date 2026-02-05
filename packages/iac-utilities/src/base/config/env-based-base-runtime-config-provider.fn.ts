import { BaseRuntimeConfig } from '../utils/base-runtime-config.type.js'
import { BaseRuntimeConfigProviderFn, IacStackConfigService } from '../utils/iac-stack-config.service.js'

export const envBasedBaseRuntimeConfigProvider: BaseRuntimeConfigProviderFn = () => {
  if (process && process.env[IacStackConfigService.envBaseRuntimeConfig] !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return JSON.parse(process.env[IacStackConfigService.envBaseRuntimeConfig]!) as BaseRuntimeConfig
  }
  throw new Error('No base runtime config found in environment variables')
}
