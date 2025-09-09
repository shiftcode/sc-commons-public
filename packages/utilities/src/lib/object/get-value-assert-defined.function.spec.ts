import { getValueAssertDefined } from './get-value-assert-defined.function.js'

describe('getValueAssertDefined', () => {
  interface Test {
    x: string | null
    y?: boolean
    z: number | undefined
  }

  describe('throws when not defined', () => {
    const empty: Test = { x: null, z: undefined }

    test('when null', () => {
      expect(() => getValueAssertDefined(empty, 'x')).toThrow()
    })

    test('when undefined', () => {
      expect(() => getValueAssertDefined(empty, 'z')).toThrow()
    })

    test('when optional', () => {
      expect(() => getValueAssertDefined(empty, 'y')).toThrow()
    })
  })

  describe('returns value when defined', () => {
    const obj: Test = {
      x: '',
      y: false,
      z: 0,
    }

    test('when empty string', () => {
      expect(getValueAssertDefined(obj, 'x')).toEqual('')
    })
    test('when false', () => {
      expect(getValueAssertDefined(obj, 'y')).toEqual(false)
    })
    test('when zero', () => {
      expect(getValueAssertDefined(obj, 'z')).toEqual(0)
    })

    test('makes it type safe', () => {
      const tDefined: { num: number | null } = { num: 42 }
      // assign to variable to ensure type safety
      const res: number = getValueAssertDefined(tDefined, 'num')
      expect(res).toEqual(42)
    })
  })
})
