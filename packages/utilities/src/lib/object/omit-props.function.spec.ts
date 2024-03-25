import { omitProps } from './omit-props.function.js'

describe('omitProps', () => {
  test('removes the specified props from given object', () => {
    const res = omitProps({ a: true, b: false, c: 'ok' }, ['a'])
    expect(res).toEqual({ b: false, c: 'ok' })
  })

  test('does not alter original object', () => {
    const orig = Object.freeze({ foo: 'bar', hello: 'world', a: true, b: false })
    expect(() => omitProps(orig, ['a', 'b'])).not.toThrow()
  })

  test('is typesafe', () => {
    type A = { a: boolean; b: string }
    type B = { a: boolean; b?: number }
    const fn = (arg: B) => arg.a
    const value: A = { a: true, b: 'foo bar' }
    // if omitProps would not propertly remove `b` from the type, it would not be assignable
    expect(fn(omitProps(value, ['b']))).toBe(true)
  })
})
