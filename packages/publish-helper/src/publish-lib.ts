#!/usr/bin/env node
import {
  BranchInfo,
  getBranchInfo,
  getGhToken,
  GitHubContext,
  gitSwitchBranch,
  hasGithubContext,
  isGithubWorkflow,
} from '@shiftcode/branch-utilities'
import * as process from 'process'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { exec } from './helpers'

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
    publish(options, process.env)
    log('DONE')
  } catch (err) {
    log('FAIL')
    console.error(err)
    process.exit(1)
  }
}

run()

function log(...args: any[]) {
  console.log(`publish-libs::`, ...(args || []).map((v) => (typeof v === 'string' ? v : JSON.stringify(v))))
}

function publish(opts: Options, env: unknown) {
  const branchInfo = getBranchInfo(env)
  log(`start publishing for branch ${branchInfo.branchName}`)

  const isGhWorkflow = isGithubWorkflow(env)

  if (branchInfo.isProd) {
    publishMaster(opts)
  } else if (isGhWorkflow && branchInfo.isPr) {
    if (opts.canary) {
      publishCanary(opts, branchInfo)
    } else if (hasGithubContext(env)) {
      // don't use token from github context but use e custom PAT provided through GH_TOKEN env var
      // otherwise no new github workflow is triggered (when using wrong token)
      publishPreRelease(opts, branchInfo, JSON.parse(env.GITHUB_CONTEXT) as GitHubContext, getGhToken(env))
    } else {
      // tslint:disable-next-line:no-invalid-template-strings
      throw new Error('GITHUB_CONTEXT not defined as env var. Use `GITHUB_CONTEXT: ${{ toJson(github) }}` for action ')
    }
  } else {
    log('DO NOTHING (neither master nor pr build; or maybe master but locally - use SC_OVERRIDE then.)')
  }
}

function publishMaster(opts: Options) {
  log('PUBLISH MASTER')
  execLerna(
    'version',
    [
      '--conventional-commits',
      '--conventional-graduate',
      '--changelog-preset conventional-changelog-conventionalcommits',
    ],
    opts.verbose,
  )
  execLerna('publish', ['from-package'], opts.verbose, null)
}

function publishPreRelease(
  opts: Options,
  branchInfo: BranchInfo,
  { event, repository }: GitHubContext,
  ghToken: string,
) {
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
  exec('git tag -d $(git describe --abbrev=0)')
  exec('git remote -v')
  exec('git push')
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
