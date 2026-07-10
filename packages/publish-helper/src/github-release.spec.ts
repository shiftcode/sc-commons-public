import { describe, expect, test } from 'vitest'

import { buildReleaseBody, buildReleaseTag } from './github-release.js'

describe('buildReleaseTag', () => {
  test('stable release uses ISO timestamp prefix', () => {
    const tag = buildReleaseTag(false, 'main')
    expect(tag).toMatch(/^releases\/\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}$/)
  })

  test('pre-release uses stage prefix', () => {
    expect(buildReleaseTag(true, 'pr84')).toBe('releases/pr84')
    expect(buildReleaseTag(true, 'pr123')).toBe('releases/pr123')
  })
})

describe('buildReleaseBody', () => {
  test('lists all published packages with changelog links', () => {
    const tags = ['@shiftcode/branch-utilities@6.1.0', '@shiftcode/logger@3.0.0']
    const body = buildReleaseBody(tags, 'shiftcode/sc-commons-public')
    expect(body).toContain('## Package Version Set')
    expect(body).toContain('**@shiftcode/branch-utilities** `6.1.0`')
    expect(body).toContain(
      'https://github.com/shiftcode/sc-commons-public/blob/main/packages/branch-utilities/CHANGELOG.md',
    )
    expect(body).toContain('**@shiftcode/logger** `3.0.0`')
    expect(body).toContain('https://github.com/shiftcode/sc-commons-public/blob/main/packages/logger/CHANGELOG.md')
  })

  test('returns empty section when no package tags provided', () => {
    const body = buildReleaseBody([], 'shiftcode/sc-commons-public')
    expect(body).toBe('## Package Version Set\n')
  })

  test('uses custom ref in changelog links when provided', () => {
    const tags = ['@shiftcode/logger@3.0.0-pr84.0']
    const sha = 'abc1234def5678'
    const body = buildReleaseBody(tags, 'shiftcode/sc-commons-public', sha)
    expect(body).toContain(`https://github.com/shiftcode/sc-commons-public/blob/${sha}/packages/logger/CHANGELOG.md`)
  })

  test('skips tags with unexpected format', () => {
    const tags = ['@shiftcode/logger@3.0.0', 'invalid-tag']
    const body = buildReleaseBody(tags, 'shiftcode/sc-commons-public')
    expect(body).toContain('**@shiftcode/logger**')
    expect(body).not.toContain('invalid-tag')
  })
})
