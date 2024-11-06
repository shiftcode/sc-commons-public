import { gitBranchName } from './git.utils.js'
import { getGithubBranchName, isGithubPullRequest, isGithubWorkflow } from './github.utils.js'
import { CustomScOverrideEnv } from './types/sc-override-env-var.type.js'

/** regex to match the master branch */
export const REGEX_MASTER = /^master$/

/** regex to match the main branch */
export const REGEX_MAIN = /^main$/

/** regex to match our branch conventions with the following capture groups: fullMatch / branch id / branch name */
export const REGEX_BRANCH_NAME = /^[a-z]*\/?#(\d+)-(.*)/

export interface StageInfo {
  isProd: boolean
  isPr: boolean
  stage: string
}

export interface BranchInfo extends StageInfo {
  branchName: string
  name: string
}

/**
 * create the {@link StageInfo} object from given stage
 * @param stage the name either matching xx\d+ , pr\d+ or master|main
 */
export function createStageInfo(stage: string): StageInfo {
  const isPr = isPullRequest(stage)
  const isXx = isDevStage('xx')
  const isProd = isProduction(stage)
  if (!isPr && !isXx && !isProd) {
    throw new Error('The provided stage neither is xx nor pr nor master/main.')
  }
  return { stage, isProd, isPr }
}

/**
 * @param env process.env
 * @return Returns the branch info containing the stage which is defined as xx|pr<branchId> or 'master' / 'main'
 * @throws if master | main branch is used locally without override flag
 */
export function getBranchInfo(env: unknown, branchName?: string, noLog?: boolean): BranchInfo {
  let isPr = false

  if (isFullBranchOverrideDefined(env)) {
    // full branch name override via env vars SC_OVERRIDE_BRANCH_NAME and SC_OVERRIDE_IS_PR
    branchName = getBranchNameOverride(env)
    isPr = getIsPrOverride(env)
  } else if (isGithubWorkflow(env)) {
    // github workflow environment
    branchName = branchName ?? getGithubBranchName(env)
    isPr = isGithubPullRequest(env)
  } else {
    // local environment
    branchName = branchName ?? gitBranchName()
  }

  if (isMasterBranch(branchName) || isMainBranch(branchName)) {
    if (!isGithubWorkflow(env) && !isScOverrideActive(env) && !noLog) {
      throw new Error(`prod (master or main) branch can't be used locally`)
    }
    return {
      branchName,
      isProd: true,
      isPr: false,
      stage: branchName,
      name: branchName,
    }
  } else {
    const { branchId, branchName: name } = parseBranchName(branchName)
    return {
      branchName,
      isProd: false,
      isPr,
      stage: isPr ? `pr${branchId}` : `xx${branchId}`,
      name,
    }
  }
}

export function isFullBranchOverrideDefined(envVars: unknown): envVars is CustomScOverrideEnv {
  return (
    envVars !== null &&
    typeof (envVars as CustomScOverrideEnv).SC_OVERRIDE_BRANCH_NAME === 'string' &&
    typeof (envVars as CustomScOverrideEnv).SC_OVERRIDE_IS_PR === 'string'
  )
}

export function getBranchNameOverride(env: CustomScOverrideEnv): string {
  return env.SC_OVERRIDE_BRANCH_NAME
}

export function getIsPrOverride(env: CustomScOverrideEnv): boolean {
  return env.SC_OVERRIDE_IS_PR === 'true'
}

/**
 * @return Returns the branch name. The name is resolved depending on provided environment (github actions | local).
 */
export function resolveBranchName(env: unknown): string {
  if (isGithubWorkflow(env)) {
    // github workflow environment
    return getGithubBranchName(env)
  } else {
    // local environment
    return gitBranchName()
  }
}

/**
 * @return Returns true if the given branch name (if any, otherwise we resolve depending on runtime,
 * see @link resolveBranchName) is the master branch, false otherwise
 * @throws Throws an error when this method is called locally without override flag to prevent from accidential execution
 * on master branch
 * @link resolveBranchName
 */
export function isMasterBranch(branchName: string): boolean {
  return REGEX_MASTER.test(branchName)
}

/**
 * @return Returns true if the given branch name (if any, otherwise we resolve depending on runtime,
 * see @link resolveBranchName) is the main branch, false otherwise
 * @throws Throws an error when this method is called locally without override flag to prevent from accidential execution
 * on main branch
 * @link resolveBranchName
 */
export function isMainBranch(branchName: string): boolean {
  return REGEX_MAIN.test(branchName)
}

/**
 * @return Returns an object containing branchId and branchName
 * @throws Throws an error if given branchName does not match our convention
 */
export function parseBranchName(branchName: string): { branchId: number; branchName: string } {
  const matches = branchName.match(REGEX_BRANCH_NAME)
  if (matches) {
    // [0] full match / [1] branch id / [2] branch name
    const [, branchId, branchN] = matches
    return {
      branchId: parseInt(branchId, 10),
      branchName: branchN,
    }
  } else {
    throw new Error(
      `given branch name ${branchName} does not match our convention #<one or more digit>-<branch-name-with-kebap-case>`,
    )
  }
}

/**
 * Determine if stage is production (master | main) or not.
 *
 * @param stageName the stage to evaluate
 * @return returns true if the stage is 'master' or 'main', false if not
 */
export function isProduction(stageName: string): boolean {
  return REGEX_MASTER.test(stageName) || REGEX_MAIN.test(stageName)
}

/**
 * Determine if stage is a pull request.
 *
 * @param stageName the stage to evaluate
 * @return true if it's a pull request, false if not
 */
export function isPullRequest(stageName: string): boolean {
  return stageName.startsWith('pr')
}

function isDevStage(stageName: string): boolean {
  return stageName.startsWith('xx')
}
export function isScOverrideActive(env: unknown): env is CustomScOverrideEnv {
  return typeof env === 'object' && env !== null && (env as CustomScOverrideEnv).SC_OVERRIDE === 'true'
}
