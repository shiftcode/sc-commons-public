import { describe, expect, test } from 'vitest'

import { isNumber } from './is-number.js'

describe('isNumber', () => {
  test('should return true for valid number values', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(123)).toBe(true)
    expect(isNumber(-456)).toBe(true)
    expect(isNumber(3.14)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber(-Infinity)).toBe(true)
  })

  test('should return false for NaN', () => {
    expect(isNumber(NaN)).toBe(false)
  })

  test('should return false for non-number values', () => {
    expect(isNumber('123')).toBe(false)
    expect(isNumber(true)).toBe(false)
    expect(isNumber(false)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber(new Date())).toBe(false)
  })
})
