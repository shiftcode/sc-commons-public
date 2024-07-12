import { BranchInfo, getBranchInfo, parseBranchName } from './base.utils.js'
import { CustomGitHubContext, GithubActionEnv, GitHubContext } from './types/index.js'
import { CustomScOverrideEnv } from './types/sc-override-env-var.type.js'

describe('base utils', () => {
  describe('getBranchInfo', () => {
    test('throws when master but run locally', () => {
      expect(() => getBranchInfo({}, 'master')).toThrow()
    })
    test('works when master run locally with override', () => {
      const env: CustomScOverrideEnv = {
        SC_OVERRIDE: 'true',
        SC_OVERRIDE_BRANCH_NAME: undefined,
        SC_OVERRIDE_IS_PR: undefined,
      }
      expect(getBranchInfo(env, 'master')).toEqual(<BranchInfo>{
        stage: 'master',
        isPr: false,
        isProd: true,
        name: 'master',
        branchName: 'master',
      })
    })

    test('works locally when not master', () => {
      expect(getBranchInfo({}, '#7-abc')).toEqual({
        branchName: '#7-abc',
        isProd: false,
        isPr: false,
        stage: 'xx7',
        name: 'abc',
      })
    })

    test('works when Github Workflow PR', () => {
      const env: Partial<GithubActionEnv> = {
        GITHUB_ACTIONS: 'true',
        GITHUB_EVENT_NAME: 'pull_request',
        GITHUB_HEAD_REF: '#77-update',
      }
      expect(getBranchInfo(env)).toEqual({
        branchName: '#77-update',
        isProd: false,
        isPr: true,
        stage: 'pr77',
        name: 'update',
      })
    })

    test('works when Github Workflow master', () => {
      const env: Partial<GithubActionEnv & CustomGitHubContext> = {
        GITHUB_ACTIONS: 'true',
        GITHUB_EVENT_NAME: 'push',
        GITHUB_CONTEXT: JSON.stringify(<Partial<GitHubContext>>{
          ref: 'refs/heads/master',
        }),
      }
      expect(getBranchInfo(env)).toEqual({
        branchName: 'master',
        isProd: true,
        isPr: false,
        stage: 'master',
        name: 'master',
      })
    })

    test('works with env var overrides', () => {
      const env: CustomScOverrideEnv = {
        SC_OVERRIDE: 'true',
        SC_OVERRIDE_BRANCH_NAME: '#1313-on-branch-to-override-them-all',
        SC_OVERRIDE_IS_PR: 'true',
      }
      expect(getBranchInfo(env, 'master')).toEqual(<BranchInfo>{
        stage: 'pr1313',
        isPr: true,
        isProd: false,
        name: 'on-branch-to-override-them-all',
        branchName: '#1313-on-branch-to-override-them-all',
      })
    })
  })

  describe('parseBranchName', () => {
    test('works when valid pattern', () => {
      expect(parseBranchName('#7-abc').branchId).toBe(7)
      expect(parseBranchName('#72-abc').branchId).toBe(72)
      expect(parseBranchName('#72- whatever').branchId).toBe(72)
      expect(parseBranchName('feature/#72-ok').branchId).toBe(72)
    })
    test('throws when invalid pattern', () => {
      expect(() => parseBranchName('whrjwe')).toThrow()
    })
  })
})
