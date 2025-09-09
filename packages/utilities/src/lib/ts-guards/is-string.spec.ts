import { isString } from './is-string.js'

describe('isString', () => {
  it('should return true for string values', () => {
    expect(isString('')).toBe(true)
    expect(isString('hello')).toBe(true)
    expect(isString('123')).toBe(true)
    expect(isString(' ')).toBe(true)
  })

  it('should return false for non-string values', () => {
    expect(isString(123)).toBe(false)
    expect(isString(true)).toBe(false)
    expect(isString(false)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString(new Date())).toBe(false)
  })
})
