import { hexToRgb } from './hex-to-rgb.function.js'

describe('hexToRgb', () => {
  test('works with # and without #', () => {
    expect(hexToRgb('#ffcc00')).toEqual([255, 204, 0])
    expect(hexToRgb('ffcc00')).toEqual([255, 204, 0])
  })
  test('works with 3 or 6 digits', () => {
    expect(hexToRgb('#ffcc00')).toEqual([255, 204, 0])
    expect(hexToRgb('#fc0')).toEqual([255, 204, 0])
    expect(hexToRgb('fc0')).toEqual([255, 204, 0])
  })
  test('transforms correctly', () => {
    expect(hexToRgb('#ffffff')).toEqual([255, 255, 255])
    expect(hexToRgb('#000000')).toEqual([0, 0, 0])
  })
  test('throws Error when invalid hex code', () => {
    expect(() => hexToRgb('zzzzzz')).toThrow(Error)
    expect(() => hexToRgb('#fc00')).toThrow(Error)
    expect(() => hexToRgb('ffc00fd')).toThrow(Error)
  })
})
