/* eslint-disable @typescript-eslint/naming-convention */
/** see https://help.github.com/en/github/automating-your-workflow-with-github-actions/using-environment-variables#default-environment-variables */
export interface GithubActionEnv {
  HOME: string

  /** name of the workflow */
  GITHUB_WORKFLOW: string

  /** The unique identifier (id) of the action. */
  GITHUB_ACTION: string

  /**
   * A unique number for each run within a repository. This number does not change if you re-run the workflow run.
   */
  GITHUB_RUN_ID: string

  /**
   * Always set to true when GitHub Actions is running the workflow. You can use this variable to differentiate when
   * tests are being run locally or by GitHub Actions.
   */
  GITHUB_ACTIONS: 'true'

  GITHUB_ACTOR: string

  GITHUB_REPOSITORY: string

  /** The name of the webhook event that triggered the workflow. */
  GITHUB_EVENT_NAME: 'push' | 'pull_request'

  /** The path of the file with the complete webhook event payload. For example, /github/workflow/event.json. */
  GITHUB_EVENT_PATH: string

  /**
   * The GitHub workspace directory path. The workspace directory contains a subdirectory with a copy of your repository
   * if your workflow uses the actions/checkout action. If you don't use the actions/checkout action, the directory will
   * be empty. For example, /home/runner/work/my-repo-name/my-repo-name.
   */
  GITHUB_WORKSPACE: string

  /**
   * The branch or tag ref that triggered the workflow. For example, refs/heads/feature-branch-1. If neither a branch or
   * tag is available for the event type, the variable will not exist.
   */
  GITHUB_SHA?: string

  /** Only set for forked repositories. The branch of the head repository. */
  GITHUB_HEAD_REF?: string

  /** Only set for forked repositories. The branch of the base repository. */
  GITHUB_BASE_REF?: string
}
