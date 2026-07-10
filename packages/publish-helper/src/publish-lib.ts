#!/usr/bin/env node

import * as process from 'node:process'

import {
  BranchInfo,
  getBranchInfo,
  GitHubContext,
  gitSwitchBranch,
  hasGithubContext,
  isGithubWorkflow,
  tryGetGhToken,
} from '@shiftcode/branch-utilities'
import yargs from 'yargs'
// eslint-disable-next-line import/no-internal-modules
import { hideBin } from 'yargs/helpers'

import { publishConsolidatedRelease } from './github-release.js'
import { exec, execReturn } from './helpers.js'

interface Options {
  canary: boolean
  verbose: boolean
}

const argv = yargs(hideBin(process.argv))
  .option('canary', {
    type: 'boolean',
    default: false,
    description: 'use lerna canary mode instead of conventional-prerelease for PR releases',
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
    default: false,
  }).argv

async function run() {
  log('START')
  try {
    const options: Options = await argv
    await publish(options, process.env)
    log('DONE')
  } catch (err) {
    log('FAIL')
    console.error(err)
    process.exit(1)
  }
}

void run()

function log(...args: any[]) {
  console.log(`publish-libs::`, ...(args || []).map((v) => (typeof v === 'string' ? v : JSON.stringify(v))))
}

async function publish(opts: Options, env: unknown): Promise<void> {
  const branchInfo = getBranchInfo(env)
  log(`start publishing for branch ${branchInfo.branchName}`)

  const isGhWorkflow = isGithubWorkflow(env)

  if (branchInfo.isProd) {
    const ghToken = tryGetGhToken(env)
    const repository = isGithubWorkflow(env) ? env.GITHUB_REPOSITORY : undefined
    await publishMaster(opts, repository, ghToken)
  } else if (isGhWorkflow && branchInfo.isPr) {
    if (opts.canary) {
      publishCanary(opts, branchInfo)
    } else if (hasGithubContext(env)) {
      await publishPreRelease(opts, branchInfo, JSON.parse(env.GITHUB_CONTEXT) as GitHubContext, tryGetGhToken(env))
    } else {
      throw new Error('GITHUB_CONTEXT not defined as env var. Use `GITHUB_CONTEXT: ${{ toJson(github) }}` for action ')
    }
  } else {
    log('DO NOTHING (neither master nor pr build; or maybe master but locally - use SC_OVERRIDE then.)')
  }
}

/** Returns the set of all local git tags. */
function getTagsSet(): Set<string> {
  return new Set(execReturn('git tag -l').split('\n').filter(Boolean))
}

/** Returns package tags that are new since `tagsBefore` was captured. */
function getNewPackageTags(tagsBefore: Set<string>): string[] {
  return [...getTagsSet()].filter((t) => !tagsBefore.has(t) && /^@shiftcode\/[^@]+@\d/.test(t))
}

async function publishMaster(opts: Options, repository?: string, ghToken?: string | null): Promise<void> {
  log('PUBLISH MASTER')
  const tagsBefore = getTagsSet()
  execLerna(
    'version',
    ['--conventional-commits', '--conventional-graduate', '--changelog-preset conventional-changelog-angular'],
    opts.verbose,
  )
  execLerna('publish', ['from-package'], opts.verbose, null)

  if (repository && ghToken) {
    const newPackageTags = getNewPackageTags(tagsBefore)
    log(`New package tags: ${newPackageTags.join(', ') || 'none'}`)
    const targetCommitish = execReturn('git rev-parse HEAD')
    await publishConsolidatedRelease(repository, ghToken, newPackageTags, false, 'main', targetCommitish)
  } else {
    log('Skipping GitHub Release creation: no repository or token available')
  }
}

async function publishPreRelease(
  opts: Options,
  branchInfo: BranchInfo,
  { event, repository }: GitHubContext,
  ghToken: string | null,
): Promise<void> {
  log('PUBLISH PreRelease')
  const preId = branchInfo.stage

  // checkout the actual commit (when PR we're on a detached head)
  const currentSha = gitSwitchBranch(ghToken, repository, event.pull_request.head.ref)
  // check if the latest checked out commit is still our PR commit - throw otherwise (we can't proceed since we need to push version numbers)
  if (currentSha !== event.pull_request.head.sha) {
    log('checked out', currentSha)
    log('pr.head.ref', event.pull_request.head.sha)
    log('pr.base.ref', event.pull_request.base.sha)
    throw new Error(`Cannot proceed since there's a new commit on branch ${event.pull_request.head.ref}`)
  }
  const tagsBefore = getTagsSet()
  execLerna(
    'version',
    [
      `--conventional-commits`,
      `--conventional-prerelease`,
      `--preid ${preId}`,
      `--include-merged-tags`,
      `--no-changelog`,
      `--no-push`,
    ],
    opts.verbose,
  )
  execLerna('publish', [`from-package`, `--dist-tag ${preId}`], opts.verbose, null)
  const newPackageTags = getNewPackageTags(tagsBefore)
  exec('git tag -d $(git describe --abbrev=0)')
  exec('git push')

  if (ghToken) {
    log(`New package tags: ${newPackageTags.join(', ') || 'none'}`)
    await publishConsolidatedRelease(repository, ghToken, newPackageTags, true, preId, event.pull_request.head.sha)
  } else {
    log('Skipping GitHub Release creation: no token available')
  }
}

function publishCanary(opts: Options, branchInfo: BranchInfo) {
  log('PUBLISH Canary')
  const preId = branchInfo.stage

  execLerna('publish', ['--canary', `--preid ${preId}`, `--dist-tag ${preId}`, '--include-merged-tags'], opts.verbose)
}

function execLerna(
  command: 'publish' | 'version',
  args: string[],
  verbose: boolean,
  ignoreChanges: string[] | null = ['**/*.spec.ts', '**/test/**'],
) {
  const baseArgs = ['--yes']

  if (command === 'publish') {
    baseArgs.push('--no-verify-access')
  }

  if (verbose) {
    args.push('--loglevel debug')
  }

  if (ignoreChanges) {
    const value = ignoreChanges.map((glob) => `'${glob}'`).join(' ')
    baseArgs.push(`--ignore-changes ${value}`)
  }

  exec(`lerna ${command} ${[...args, ...baseArgs].join(' ')}`)
}
