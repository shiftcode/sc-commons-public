import { expect } from '@jest/globals'

import { getJsonStringifyReplacer } from './get-json-stringify-replacer.function.js'

describe('getJsonStringifyReplacer', () => {
  it('should handle BigInt values', () => {
    const replacer = getJsonStringifyReplacer()
    const result = replacer('key', 123456789123456789n)

    expect(result).toBe('123456789123456789')
  })

  it('should format Error instances', () => {
    const error = new Error('Test error')
    const replacer = getJsonStringifyReplacer()
    const result = replacer('key', error)

    expect(result).toEqual({
      name: 'Error',
      location: expect.any(String),
      message: 'Test error',
      stack: expect.any(String),
      cause: undefined,
    })
  })

  it('should handle circular references', () => {
    const obj: any = { name: 'test' }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    obj.self = obj

    const replacer = getJsonStringifyReplacer()

    // First call should return the object
    const firstResult = replacer('obj', obj)
    expect(firstResult).toBe(obj)

    // Second call with same object should return circular reference marker
    const secondResult = replacer('self', obj)
    expect(secondResult).toBe('<circular reference>')
  })

  it('should not alter null values', () => {
    const replacer = getJsonStringifyReplacer()
    const result = replacer('key', null)

    expect(result).toBe(null)
  })

  it('should not alter primitive values', () => {
    const replacer = getJsonStringifyReplacer()

    expect(replacer('key', 'string')).toBe('string')
    expect(replacer('key', 42)).toBe(42)
    expect(replacer('key', true)).toBe(true)
    expect(replacer('key', undefined)).toBe(undefined)
  })

  it('should not alter simple arrays', () => {
    const arr = [1, 2, 3]
    const replacer = getJsonStringifyReplacer()
    const result = replacer('arr', arr)
    expect(result).toBe(arr)
  })

  it('should apply custom replacer', () => {
    const customReplacer = (key: string, value: unknown) => {
      if (key === 'secret') {
        return '***'
      }
      return value
    }

    const replacer = getJsonStringifyReplacer(customReplacer)

    expect(replacer('secret', 'password123')).toBe('***')
  })

  it('should use custom replacer prior handling BigInt values', () => {
    const doubleBigInts = (key: string, value: unknown) => {
      if (typeof value === 'bigint') {
        return value * 2n
      }
      return value
    }

    const replacer = getJsonStringifyReplacer(doubleBigInts)
    const result = replacer('key', 50n)
    expect(result).toBe('100')
  })

  it('should use custom replacer prior handling Error instances', () => {
    const wrapErrors = (key: string, value: unknown) => {
      if (value instanceof Error) {
        return new Error('Failed', {cause: value})
      }
      return value
    }

    const replacer = getJsonStringifyReplacer(wrapErrors)
    const result = replacer('key', new Error('Original error'))

    expect(result).toHaveProperty('message', 'Failed')
    expect(result).toHaveProperty('cause', expect.objectContaining({ message: 'Original error' }))
  })

  it('should work with JSON.stringify', () => {
    const obj: any = {
      name: 'test',
      symbol: Symbol('test'),
      bigNumber: 9007199254740991n,
      error: new Error('Test error'),
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    obj.circular = obj

    const handleSymbols = (_: string, value: unknown) => (typeof value === 'symbol' ? value.toString() : value)

    const replacer = getJsonStringifyReplacer(handleSymbols)
    const result = JSON.stringify(obj, replacer)

    expect(result).toContain('"name":"test"')
    expect(result).toContain('"symbol":"Symbol(test)"')
    expect(result).toContain('"bigNumber":"9007199254740991"')
    expect(result).toContain('"circular":"<circular reference>"')
  })

})

