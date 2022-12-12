import { compareWith } from './compare-with.js'

function isGreeting(value: any) {
  return /^h(?:i|ello)$/.test(value)
}

function isGreetingCustomizer(objValue: any, othValue: any) {
  if (isGreeting(objValue) && isGreeting(othValue)) {
    return true
  }
}

describe('compare with', () => {
  // https://github.com/angus-c/just/blob/master/test/collection-compare/index.js
  describe('copied and adapted from just', () => {
    /*
     * base tests copied from just
     */
    test('strictly equal primitives return true', () => {
      expect(compareWith(3, 3)).toBeTruthy()
      expect(compareWith('3', '3')).toBeTruthy()
      expect(compareWith(true, true)).toBeTruthy()
      expect(compareWith(null, null)).toBeTruthy()
      expect(compareWith(undefined, undefined)).toBeTruthy()
    })

    test('not strictly equal primitives return false', () => {
      expect(compareWith(3, 4)).toBeFalsy()
      expect(compareWith('3', '4')).toBeFalsy()
      expect(compareWith(true, false)).toBeFalsy()
      expect(compareWith(null, undefined)).toBeFalsy()
      expect(compareWith(undefined, null)).toBeFalsy()
    })

    test('two NaN values return true', () => {
      expect(compareWith(NaN, NaN)).toBeTruthy()
    })

    test('alike arrays return true', () => {
      const value1 = [1, 2, 3, 4]
      const value2 = [1, 2, 3, 4]
      expect(compareWith(value1, value2)).toBeTruthy()
      const value3 = [1, 2, [3, 4], 5]
      const value4 = [1, 2, [3, 4], 5]
      expect(compareWith(value3, value4)).toBeTruthy()
    })

    test('unalike arrays return false', () => {
      const value1 = [1, 2, 3, 4]
      const value2 = [1, 2, 3]
      expect(compareWith(value1, value2)).toBeFalsy()
      const value3 = [1, 2, [3, 4], 5]
      const value4 = [1, 2, [3, 3], 5]
      expect(compareWith(value3, value4)).toBeFalsy()
    })

    test('alike simple objects return true', () => {
      const value1 = { a: 4, b: 3 }
      const value2 = { a: 4, b: 3 }
      expect(compareWith(value1, value2)).toBeTruthy()
      const value3 = { a: 4, b: 3 }
      const value4 = { a: 4, b: 2 + 1 }
      expect(compareWith(value3, value4)).toBeTruthy()
      const value5 = { a: 4, b: 3 }
      const value6 = { b: 2 + 1, a: 4 }
      expect(compareWith(value5, value6)).toBeTruthy()
    })

    test('unalike simple objects return false', () => {
      const value1 = { a: 4, b: 4 }
      const value2 = { a: 4, b: 3 }
      expect(compareWith(value1, value2)).toBeFalsy()
      const value3 = { a: 4, b: 4 }
      const value4 = { a: 4, b: 4, c: 5 }
      expect(compareWith(value3, value4)).toBeFalsy()
      const value5 = { a: 4, b: 3 }
      const value6 = { a: 4, b: 2 + 2 }
      expect(compareWith(value5, value6)).toBeFalsy()
      const value7 = { a: 4, b: 3 }
      const value8 = { b: 2 + 2, a: 4 }
      expect(compareWith(value7, value8)).toBeFalsy()
    })

    test('alike complex objects return true', () => {
      const value1 = { a: [4, 2], b: 3 }
      const value2 = { a: [4, 2], b: 3 }
      expect(compareWith(value1, value2)).toBeTruthy()
      const value3 = { a: { c: 5, d: [1, 2, 3] }, b: /44/ }
      const value4 = { a: { c: 5, d: [1, 4 / 2, 3] }, b: /44/ }
      expect(compareWith(value3, value4)).toBeTruthy()
      const value5 = [1, 2, [{ a: 5, b: '*', c: 9 }], false, [1, [2, 3]]]
      const value6 = [1, 2, [{ b: '*', c: 9, a: 5 }], false, [1, [2, 3]]]
      expect(compareWith(value5, value6)).toBeTruthy()
    })

    test('unalike complex objects return false', () => {
      const value1 = { a: [4, 2], b: 3 }
      const value2 = { a: [4, 2], c: 3 }
      expect(compareWith(value1, value2)).toBeFalsy()
      const value3 = { a: { c: 5, d: [1, 2, 3] }, b: /44/ }
      const value4 = { a: { c: 5, d: [1, 4 / 2, 3] }, b: /44/, e: 5 }
      expect(compareWith(value3, value4)).toBeFalsy()
      const value5 = [1, 2, [{ a: 5, b: '*', c: 9 }], false, [1, [2, 3]]]
      const value6 = [1, 2, [{ b: '?', c: 9, a: 5 }], false, [1, [2, 3]]]
      expect(compareWith(value5, value6)).toBeFalsy()
    })

    test('alike functions return true', () => {
      expect(
        compareWith(
          () => {},
          () => {},
        ),
      ).toBeTruthy()
      expect(
        compareWith(
          (a: number, b: number) => a + b,
          (a: number, b: number) => a + b,
        ),
      ).toBeTruthy()
      expect(compareWith([].slice, [].slice)).toBeTruthy()
    })

    test('unalike functions return false', () => {
      expect(
        compareWith(
          () => {},
          (a: number) => {},
        ),
      ).toBeFalsy()
      expect(
        compareWith(
          (a: number, b: number) => a + b,
          (a: number, b: number) => a - b,
        ),
      ).toBeFalsy()
      expect(compareWith([].slice, [].splice)).toBeFalsy()
    })

    test('alike regexps return true', () => {
      expect(compareWith(/hello/, /hello/)).toBeTruthy()
    })

    test('unalike regexps return true', () => {
      expect(compareWith(/hello/, /hello/g)).toBeFalsy()
    })

    test('alike dates return true', () => {
      expect(compareWith(new Date(2016, 8, 3), new Date(2016, 8, 3))).toBeTruthy()
    })

    test('alike dates return true', () => {
      expect(compareWith(new Date(2016, 8, 3), new Date(2016, 8, 3, 16))).toBeFalsy()
    })

    // https://github.com/angus-c/just/issues/98
    test('unalike complex objects do not crash when objects/arrays become null', () => {
      const value1 = { a: [4, 2], b: 3 }
      const value2 = { a: null, c: 3 }
      expect(compareWith(value1, value2)).toBeFalsy()
      const value3 = { a: { a: 1 }, b: 3 }
      const value4 = { a: null, c: 3 }
      expect(compareWith(value3, value4)).toBeFalsy()
    })
  })

  describe('compare with (with customizer)', () => {
    describe('primitives', () => {
      test('number', () => {
        const smallerThan5 = (a: number, b: number): boolean | undefined => {
          if (typeof a === 'number' && typeof b === 'number') {
            return a < 5 && b < 5
          }
        }
        expect(compareWith(1, 2, smallerThan5)).toBeTruthy()
      })

      test('string', () => {
        expect(compareWith('hi', 'hello', isGreetingCustomizer)).toBeTruthy()
      })

      test('boolean', () => {
        expect(
          compareWith(true, false, (a: boolean, b: boolean) => typeof a === 'boolean' && typeof b === 'boolean'),
        ).toBeTruthy()
      })

      test('date', () => {
        expect(
          compareWith(new Date('2019-12-01T20:00:00Z'), new Date('2019-11-01T20:00:00Z'), (a: Date, b: Date) => {
            return a.getFullYear() === b.getFullYear()
          }),
        ).toBeTruthy()
      })
    })

    test('arrays', () => {
      const a = ['a', 'b', 'c', 'hi']
      const b = ['a', 'b', 'c', 'hello']
      expect(compareWith(a, b, isGreetingCustomizer)).toBeTruthy()

      expect(
        compareWith(a, b, (value1: any[], value2: any[]) => {
          return Array.isArray(a) && Array.isArray(b) && a.includes('hi') && b.includes('hello')
        }),
      ).toBeTruthy()

      // length is not the same
      expect(compareWith([...a, 'd'], b, isGreetingCustomizer)).toBeFalsy()
    })

    test('compare object with customizer', () => {
      expect(compareWith({ a: 1, b: 'hi' }, { a: 1, b: 'hello' }, isGreetingCustomizer)).toBeTruthy()
    })

    // https://github.com/lodash/lodash/blob/4.17.11/test/test.js#L10339
    describe('copied and adapted from lodash.isEqualWith', () => {
      const noop: any = () => {}

      test('should handle comparisons when `customizer` returns `undefined`', () => {
        expect(compareWith('a', 'a', noop)).toBeTruthy()
        expect(compareWith(['a'], ['a'], noop)).toBeTruthy()
        expect(compareWith({ '0': 'a' }, { '0': 'a' }, noop)).toBeTruthy()
      })

      test('should not handle comparisons when `customizer` returns `true`', () => {
        const customizer = (value: any) => {
          return typeof value === 'string' || undefined
        }

        expect(compareWith('a', 'b', customizer)).toBeTruthy()
        expect(compareWith(['a'], ['b'], customizer)).toBeTruthy()
        expect(compareWith({ '0': 'a' }, { '0': 'b' }, customizer)).toBeTruthy()
      })

      test('should not handle comparisons when `customizer` returns `true`', () => {
        const customizer = (value: any) => {
          return typeof value === 'string' ? false : undefined
        }

        expect(compareWith('a', 'b', customizer)).toBeFalsy()
        expect(compareWith(['a'], ['b'], customizer)).toBeFalsy()
        expect(compareWith({ '0': 'a' }, { '0': 'b' }, customizer)).toBeFalsy()
      })
    })
  })
})
