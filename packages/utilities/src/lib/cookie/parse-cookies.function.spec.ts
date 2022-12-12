import { parseCookies } from './parse-cookies.function.js'

describe('parse-cookies', () => {
  it('does not fail on empty', () => {
    expect(parseCookies('')).toEqual({})
    expect(parseCookies(null)).toEqual({})
    expect(parseCookies()).toEqual({})
  })
  it('returns key value object of each cookie', () => {
    expect(parseCookies('LANG=DE')).toEqual({ LANG: 'DE' })
    expect(parseCookies('LANG=DE;OK=true;')).toEqual({ LANG: 'DE', OK: 'true' })
  })
})
