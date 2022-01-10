export interface CustomGitHubContext {
  /** stringified object of type {@link GitHubContext} */
  GITHUB_CONTEXT: string
}

export interface GitHubContext {
  ref: string
  sha: string
  event: PullRequestSynchronizeEvent
  event_name: 'push' | 'pull_request'
  token: string
  repository: string
}

export interface GithubRef {
  label: string
  ref: string
  repo: any
  sha: string
}

export interface PullRequestEvent {
  action: 'open' | 'synchronize'
  pull_request: {
    base: GithubRef
    head: GithubRef
  }
}

export interface PullRequestSynchronizeEvent extends PullRequestEvent {
  /** SHA of the commit this PR points to */
  after: string

  /** SHA of the commit this PR points to before the last synchronize event came in */
  before: string
}
