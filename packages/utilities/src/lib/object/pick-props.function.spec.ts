import { pickProps } from './pick-props.function.js'

describe('pickProps', () => {
  test('picks the properties accordingly', () => {
    const obj = { a: true, b: 'ok', c: { foo: { bar: 'baz' } }, not: false }
    const res = pickProps(obj, ['a', 'b', 'c'])
    expect(Object.keys(res)).toEqual(['a', 'b', 'c'])
    expect(res.a).toBe(true)
    expect(res.b).toBe('ok')
    expect(res.c).toBe(obj.c)
  })

  test('does not alter the provided object', () => {
    const obj = { a: true, b: 'ok', c: null }
    Object.freeze(obj) // freeze so it would throw if altered
    expect(() => pickProps(obj, ['a', 'b'])).not.toThrow()
  })
})
