import { capitalize } from './capitalize.function.js'

describe('capitalize', () => {
  test('when string length > 1', () => {
    expect(capitalize('shiftcode')).toEqual('Shiftcode')
  })
  test('when string length = 1', () => {
    expect(capitalize('s')).toEqual('S')
  })
  test('when string length < 1', () => {
    expect(capitalize('')).toEqual('')
  })
})
