import { isDefined } from './is-defined.js'

describe('isDefined', () => {
  it('should return true for defined values', () => {
    expect(isDefined('')).toBe(true)
    expect(isDefined(0)).toBe(true)
    expect(isDefined(false)).toBe(true)
    expect(isDefined([])).toBe(true)
    expect(isDefined({})).toBe(true)
    expect(isDefined('hello')).toBe(true)
    expect(isDefined(123)).toBe(true)
  })

  it('should return false for undefined values', () => {
    expect(isDefined(undefined)).toBe(false)
    expect(isDefined(null)).toBe(false)
  })
})
