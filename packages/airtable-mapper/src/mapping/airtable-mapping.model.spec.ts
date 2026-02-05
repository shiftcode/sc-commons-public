import { describe, expect, test } from 'vitest'

import { AirtableMapping } from './airtable-mapping.model.js'

class A {
  static _mapping = new AirtableMapping<A>('table-a').addFields(['name'])

  constructor(
    public key: string,
    public name: string,
  ) {}
}

class B {
  static _mapping = new AirtableMapping<B>('table-b').addMapping('a', A._mapping, true).addFields(['name'])

  constructor(
    public key: string,
    public name: string,
    public a: A,
  ) {}
}

describe('set data', () => {
  test('tableName', () => {
    expect(A._mapping.tableName).toEqual('table-a')
  })
  test('fields', () => {
    expect(A._mapping.fields).toEqual(['name'])
  })
  test('mapping', () => {
    expect(B._mapping.mappings).toEqual(
      new Map().set('a', {
        fieldMapping: A._mapping,
        single: true,
        converter: undefined,
      }),
    )
  })
})
