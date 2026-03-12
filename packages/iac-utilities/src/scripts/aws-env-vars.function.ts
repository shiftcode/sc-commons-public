import path from 'node:path'

import { getBranchInfo, isGithubWorkflow } from '@shiftcode/branch-utilities'

import { resolveActiveProfile } from './aws-sso-configure-profiles.function.js'

export interface AwsEnvVarsOptions {
  configFilePath?: string
}

export async function awsEnvVars(options: AwsEnvVarsOptions | Promise<AwsEnvVarsOptions>): Promise<string> {
  const opts = await options

  const oldLogger = console.log
  console.log = () => void 0

  const { isProd } = getBranchInfo(process.env)

  const filePath = path.join(process.cwd(), opts.configFilePath || './aws-accounts.config.json')

  const activeProfile = await resolveActiveProfile(isProd, filePath)

  console.log = oldLogger
  // Keep in mind this is a multiline template string, do not format / indent it.
  return `${
    isGithubWorkflow(process.env)
      ? `export SC_AWS_ACCOUNT_ID=${activeProfile.sso_account_id}`
      : `export AWS_PROFILE=${activeProfile.profileName}`
  }
export AWS_REGION=${activeProfile.region}`
}
