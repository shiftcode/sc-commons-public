import { mapValuesDeep } from './map-values-deep.js'

describe('map values deep', () => {
  // base copied from https://github.com/angus-c/just/blob/master/test/object-map-values/index.js
  describe('copied and adapted from just', () => {
    test('applies predicate using value argument', () => {
      const obj1 = { a: 3, b: 5, c: 9 }
      const result1 = mapValuesDeep(obj1, (value) => {
        return value + 1
      })
      expect(result1).toEqual({ a: 4, b: 6, c: 10 })
      const obj2 = { a: 3, b: 0, c: null }
      const result2 = mapValuesDeep(obj2, (value) => {
        return Boolean(value)
      })
      expect(result2).toEqual({ a: true, b: false, c: false })
    })

    test('applies predicate using key argument', () => {
      const obj1 = { a: 3, b: 5, c: 9 }
      const result1 = mapValuesDeep(obj1, (value, key) => {
        return key
      })
      expect(result1).toEqual({ a: 'a', b: 'b', c: 'c' })
    })

    test('applies predicate using value and key arguments', () => {
      const obj1 = { a: 3, b: 5, c: 9 }
      const result1 = mapValuesDeep(obj1, (value, key) => {
        return key + value
      })
      expect(result1).toEqual({ a: 'a3', b: 'b5', c: 'c9' })
    })

    test('applies predicate using all arguments', () => {
      const obj1 = { a: 3, b: 5, c: 9 }
      const result1 = mapValuesDeep(obj1, (value, key, obj) => {
        return obj['b'] + value + key
      })
      expect(result1).toEqual({ a: '8a', b: '10b', c: '14c' })
    })

    test('null and undefined', () => {
      expect(mapValuesDeep(null, Boolean)).toBe(null)
      expect(mapValuesDeep(undefined, Boolean)).toBe(undefined)
    })
  })

  describe('deep behaviour', () => {
    describe('applies predicate using value argument', () => {
      test('object without array', () => {
        const obj1 = { a: 3, b: 5, c: 9, d: { a: 2, b: 4 } }
        const resultObj1 = mapValuesDeep(obj1, (value) => {
          return value + 1
        })
        expect(resultObj1).toEqual({ a: 4, b: 6, c: 10, d: { a: 3, b: 5 } })
      })

      test('object with non empty array', () => {
        const obj2 = { a: 3, b: 0, c: null, d: { a: 2, b: null }, e: [3, 4, null] }
        const result2 = mapValuesDeep(obj2, (value) => {
          return Boolean(value)
        })
        expect(result2).toEqual({ a: true, b: false, c: false, d: { a: true, b: false }, e: [true, true, false] })
      })

      test('object with empty array', () => {
        // predicate should be applied on empty array
        const obj = { a: 3, b: 0, c: null, d: { a: 2, b: null }, e: [] }
        const result = mapValuesDeep(obj, (value) => {
          return Boolean(value)
        })
        expect(result).toEqual({ a: true, b: false, c: false, d: { a: true, b: false }, e: true })
      })

      test('empty root array', () => {
        // predicate should be applied on empty array
        const arr: any[] = []
        const result = mapValuesDeep(arr, (value) => {
          return Boolean(value)
        })
        expect(result).toEqual(true)
      })

      test('root level array', () => {
        const arr = [
          { a: 0, b: 1 },
          { a: 0, b: 1 },
          { a: 0, b: 1 },
        ]
        const result = mapValuesDeep(arr, (value) => {
          return Boolean(value)
        })

        expect(result).toEqual([
          { a: false, b: true },
          { a: false, b: true },
          { a: false, b: true },
        ])
      })
    })

    test('applies predicate using key argument', () => {
      const obj1 = { a: 3, b: 5, c: 9, d: { a: 6, b: 9, c: { a: 6 } } }
      const result1 = mapValuesDeep(obj1, (value, key) => {
        return key
      })
      expect(result1).toEqual({ a: 'a', b: 'b', c: 'c', d: { a: 'a', b: 'b', c: { a: 'a' } } })
    })

    test('applies predicate using value and key arguments', () => {
      const obj1 = { a: 3, b: 5, c: 9, d: { a: 2, b: 4, c: { a: 1, b: 3 } } }
      const result1 = mapValuesDeep(obj1, (value, key) => {
        return key + value
      })
      expect(result1).toEqual({ a: 'a3', b: 'b5', c: 'c9', d: { a: 'a2', b: 'b4', c: { a: 'a1', b: 'b3' } } })
    })

    test('applies predicate using all arguments', () => {
      // deep
      const obj1 = { a: 3, b: 5, c: 9, d: { a: 1, b: 2 } }
      const result1 = mapValuesDeep(obj1, (value, key, obj) => {
        return obj['b'] + value + key
      })

      expect(result1).toEqual({ a: '8a', b: '10b', c: '14c', d: { a: '3a', b: '4b' } })
    })

    test('maps arrays inside object', () => {
      const obj1 = { a: 'foo', b: 'bar', c: [2, 4, 6] }
      const result1 = mapValuesDeep(obj1, (value) => `x_${value}`)
      expect(result1).toEqual({ a: 'x_foo', b: 'x_bar', c: ['x_2', 'x_4', 'x_6'] })
    })
  })
})
