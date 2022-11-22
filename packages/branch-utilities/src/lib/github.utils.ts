import exp from 'constants'
import { CustomGitHubContext, GithubActionEnv, GitHubContext } from './types/index.js'

/**
 *  checks if running inside a gitHub workflow
 */
export function isGithubWorkflow(envVars: unknown): envVars is GithubActionEnv {
  return typeof envVars === 'object' && envVars !== null && (envVars as GithubActionEnv).GITHUB_ACTIONS === 'true'
}

/**
 *  checks whether GITHUB_CONTEXT exists on given env.
 */
export function hasGithubContext<T extends object>(envVars: T): envVars is T & CustomGitHubContext {
  return envVars !== null && typeof (envVars as CustomGitHubContext).GITHUB_CONTEXT === 'string'
}

/**
 *  checks env if running on a Pull Request
 */
export function isGithubPullRequest(env: GithubActionEnv): boolean {
  return env.GITHUB_EVENT_NAME === 'pull_request'
}

/**
 * returns the branch name from github action env
 */
export function getGithubBranchName(env: GithubActionEnv): string {
  if (isGithubPullRequest(env)) {
    if (env.GITHUB_HEAD_REF) {
      return env.GITHUB_HEAD_REF
    }
    throw new Error('env var GITHUB_HEAD_REF must be defined')
  } else {
    if (hasGithubContext(env)) {
      const ctx: GitHubContext = JSON.parse(env.GITHUB_CONTEXT)
      // tslint:disable-next-line:no-non-null-assertion
      return ctx.ref.replace('refs/heads/', '')
    }
    throw new Error(`env var GITHUB_CONTEXT must be defined`)
  }
}

/**
 * returns token from env var GH_TOKEN or throws when not available
 */
export function getGhToken(env: unknown): string {
  if (typeof env === 'object' && env !== null && hasGhToken(env)) {
    return env.GH_TOKEN
  }
  throw new Error('no GH_TOKEN found in env')
}

function hasGhToken<T extends object>(x: T): x is T & { GH_TOKEN: string } {
  return 'GH_TOKEN' in x && typeof (<any>x)['GH_TOKEN'] === 'string'
}
