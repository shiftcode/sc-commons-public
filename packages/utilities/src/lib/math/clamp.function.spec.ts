import { clamp } from './clamp.function.js'

describe('clamp', () => {
  test('returns val when in range', () => {
    expect(clamp(0, 1, 2)).toBe(1)
    expect(clamp(-10, -7, -5)).toBe(-7)
  })

  test('returns min when val smaller than min', () => {
    expect(clamp(0, -1, 2)).toBe(0)
    expect(clamp(-10, -20, -5)).toBe(-10)
  })

  test('returns max when val bigger than max', () => {
    expect(clamp(0, 3, 2)).toBe(2)
    expect(clamp(-10, 0, -5)).toBe(-5)
  })
})
