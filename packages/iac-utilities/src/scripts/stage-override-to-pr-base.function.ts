import { execSync } from 'node:child_process'

interface GitHubPr {
  headRefName: string
}

export function stageOverrideToPrBase(): string {
  const gitHubPrJson = execSync('gh pr list --json headRefName,title,isDraft,closed', { encoding: 'utf8' }).trim()
  const gitHubPrs: GitHubPr[] = JSON.parse(gitHubPrJson)

  const branchNameOverride = process.env['GITHUB_BASE_REF']
  const isPrOverride = !!gitHubPrs.find((pr) => pr.headRefName === branchNameOverride)

  return `
  export SC_OVERRIDE_BRANCH_NAME=${branchNameOverride}
  export SC_OVERRIDE_IS_PR=${isPrOverride}
  `
}
