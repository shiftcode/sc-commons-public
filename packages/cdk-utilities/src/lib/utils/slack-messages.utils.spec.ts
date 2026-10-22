import { describe, expect, test } from 'vitest'

import { escapeForSlackTruncated } from './slack-messages.utils.js'

describe('escapeForSlackTruncated', () => {
  test('escapes and returns short text unchanged', () => {
    expect(escapeForSlackTruncated('a<b>&', 100)).toBe('a&lt;b&gt;&amp;')
  })

  test('never exceeds maxLength and never splits an entity', () => {
    for (let max = 20; max < 40; max++) {
      const result = escapeForSlackTruncated('<&>'.repeat(50), max, '…')
      expect(result.length).toBeLessThanOrEqual(max)
      expect(result.slice(0, -1)).toMatch(/^(&lt;|&amp;|&gt;)*$/)
      expect(result.endsWith('…')).toBe(true)
    }
  })
})
