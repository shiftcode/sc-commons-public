import { jsonMapSetStringifyReplacer } from './json-stringify-replacer.function'

describe('jsonMapSetStringifyReplacer', () => {
  describe('replaces sets', () => {
    it('basically works', () => {
      const val = new Set(['a', 'b'])
      expect(jsonMapSetStringifyReplacer('', val)).toEqual({ type: 'scStringifiedSet', values: ['a', 'b'] })
    })

    it('works with JSON.stringify', () => {
      const val = {
        propA: ['a', 'b'],
        propB: new Set(['a', 'b']),
      }
      expect(JSON.stringify(val, jsonMapSetStringifyReplacer)).toEqual(
        '{"propA":["a","b"],"propB":{"type":"scStringifiedSet","values":["a","b"]}}',
      )
    })
  })
  describe('replaces maps', () => {
    it('basically works', () => {
      const val = new Map().set(5, '5')
      expect(jsonMapSetStringifyReplacer('', val)).toEqual({ type: 'scStringifiedMap', entries: [[5, '5']] })
    })

    it('works with JSON.stringify', () => {
      const val = {
        propA: ['5'],
        propB: new Map().set(5, '5'),
      }
      expect(JSON.stringify(val, jsonMapSetStringifyReplacer)).toEqual(
        '{"propA":["5"],"propB":{"type":"scStringifiedMap","entries":[[5,"5"]]}}',
      )
    })
  })
})
