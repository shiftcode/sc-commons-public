import { getBranchInfo } from '@shiftcode/branch-utilities'

import { BaseRuntimeConfigProviderFn } from '../utils/iac-stack-config.service.js'

const REGION_ENV_VAR = 'AWS_REGION'

/**
 * reads the branchInfo (stage, isProd isPr) and the aws region env var to build the {@link BaseRuntimeConfig}
 */
export const buildTimeBaseRuntimeConfigProvider: BaseRuntimeConfigProviderFn = () => {
  const { stage, isProd, isPr } = getBranchInfo(process.env)
  const region = process.env[REGION_ENV_VAR]
  if (!region) {
    throw new Error(`AWS region is not set in env (${REGION_ENV_VAR})`)
  }

  return { stage, productionFlag: isProd, pullRequestFlag: isPr, region }
}
