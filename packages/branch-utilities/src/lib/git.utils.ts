import { exec, execReturn } from './helpers'

/**
 * Will update remote settings to fetch repo and then switch to given branch.
 * @return Returns the current commit SHA
 */
export function gitSwitchBranch(githubToken: string, repository: string, branchName: string): string {
  git('config', 'remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"')
  git('remote', `set-url origin https://${githubToken}@github.com/${repository}.git`)
  git('fetch')
  git('checkout', `-b "${branchName}" "origin/${branchName}" --`)
  // return current commit sha
  return execReturn(`git log -1 --pretty=format:'%H'`)
}

export function gitBranchName(): string {
  return gitReturn('symbolic-ref', '--short', '-q HEAD')
}

function git(command: string, ...args: string[]) {
  exec(`git ${command} ${args.join(' ')}`)
}

function gitReturn(command: string, ...args: string[]): string {
  return execReturn(`git ${command} ${args.join(' ')}`)
}
