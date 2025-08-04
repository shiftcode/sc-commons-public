import { execReturn } from '../lib/helpers.js'

export interface StageOverrideToPrBaseOptions {
  branchNameOverride?: string
}

export async function stageOverrideToPrBase(
  options: StageOverrideToPrBaseOptions | Promise<StageOverrideToPrBaseOptions>,
): Promise<string> {
  const opts = await options

  const gitHubPrJson = execReturn('gh pr list --json headRefName,title,isDraft,closed')
  const gitHubPrs = JSON.parse(gitHubPrJson)

  const branchNameOverride = opts.branchNameOverride || process.env['GITHUB_BASE_REF']
  const isPrOverride = !!gitHubPrs.find((pr: any) => pr.headRefName === branchNameOverride)

  return `
  export SC_OVERRIDE_BRANCH_NAME=${branchNameOverride}
  export SC_OVERRIDE_IS_PR=${isPrOverride}
  `
}
