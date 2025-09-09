import { pickPropsAssertDefined } from './pick-props-assert-defined.function.js'

describe('pickPropsAssertDefined', () => {
  test('returns object with picked props', () => {
    const obj = { a: true, b: 'foo', c: 42 }
    expect(pickPropsAssertDefined(obj, ['a', 'c'])).toEqual({ a: true, c: 42 })
  })
  test('throws when picked prop values are null or undefined', () => {
    const obj = { a: 'ok', b: null }
    expect(() => pickPropsAssertDefined(obj, ['a', 'b'])).toThrow(Error)
  })
})
