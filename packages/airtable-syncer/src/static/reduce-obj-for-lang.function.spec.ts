import { describe, expect, test } from 'vitest'

import { KEY_VALUE_SYMBOL } from '../model/key-value.symbol.js'
import { reduceObjForLang } from './reduce-obj-for-lang.function.js'

describe('reduce obj for language', () => {
  test('works on 1st nested props', () => {
    const obj = {
      description: {
        [KEY_VALUE_SYMBOL]: true,
        de: 'Beschreibung',
        en: 'Description',
        fr: 'Description',
        AIRTABLE_ID: 'recTBdFYcmyHMte7n',
        AIRTABLE_TABLE: 'KeyValue',
      },
      factsFigures: {
        [KEY_VALUE_SYMBOL]: true,
        de: 'Zahlen & Fakten',
        en: 'Numbers and facts',
        fr: 'Faits et chiffres',
        AIRTABLE_ID: 'rec3rfeCNzOZDcc3I',
        AIRTABLE_TABLE: 'KeyValue',
      },
    }

    const res = reduceObjForLang(obj, ['de'])

    expect(res).toEqual({
      description: 'Beschreibung',
      factsFigures: 'Zahlen & Fakten',
    })
  })
  test('works on multiple nested props', () => {
    const obj = {
      acc: {
        tab: {
          description: {
            [KEY_VALUE_SYMBOL]: true,
            de: 'Beschreibung',
            en: 'Description',
            fr: 'Description',
            AIRTABLE_ID: 'recTBdFYcmyHMte7n',
            AIRTABLE_TABLE: 'KeyValue',
          },
        },
        factsFigures: {
          [KEY_VALUE_SYMBOL]: true,
          de: 'Zahlen & Fakten',
          en: 'Numbers and facts',
          fr: 'Faits et chiffres',
          AIRTABLE_ID: 'rec3rfeCNzOZDcc3I',
          AIRTABLE_TABLE: 'KeyValue',
        },
      },
      filter: {
        heading: {
          [KEY_VALUE_SYMBOL]: true,
          de: 'Buchen Sie Ihren Aufenthalt',
          en: 'Book your stay',
          fr: 'Réservez votre séjour',
          AIRTABLE_ID: 'reccSxncnvTqiES7A',
          AIRTABLE_TABLE: 'KeyValue',
        },
        accommodationType: {
          heading: {
            [KEY_VALUE_SYMBOL]: true,
            de: 'Art der Unterkunft:',
            en: 'Type of accommodation:',
            fr: "Type d'hébergement",
            AIRTABLE_ID: 'recIryOmJCsXiFi6l',
            AIRTABLE_TABLE: 'KeyValue',
          },
        },
      },
    }

    const res = reduceObjForLang(obj, ['de'])

    expect(res).toEqual({
      acc: {
        tab: { description: 'Beschreibung' },
        factsFigures: 'Zahlen & Fakten',
      },
      filter: {
        heading: 'Buchen Sie Ihren Aufenthalt',
        accommodationType: { heading: 'Art der Unterkunft:' },
      },
    })
  })
  test('works on nested arrays', () => {
    const obj = {
      acc: [
        {
          description: {
            [KEY_VALUE_SYMBOL]: true,
            de: 'Beschreibung',
            en: 'Description',
            fr: 'Description',
            AIRTABLE_ID: 'recTBdFYcmyHMte7n',
            AIRTABLE_TABLE: 'KeyValue',
          },
        },
        {
          [KEY_VALUE_SYMBOL]: true,
          de: 'Zahlen & Fakten',
          en: 'Numbers and facts',
          fr: 'Faits et chiffres',
          AIRTABLE_ID: 'rec3rfeCNzOZDcc3I',
          AIRTABLE_TABLE: 'KeyValue',
        },
      ],
    }

    const res = reduceObjForLang(obj, ['de'])

    expect(res).toEqual({
      acc: [{ description: 'Beschreibung' }, 'Zahlen & Fakten'],
    })
  })
  test('does not touch numbers', () => {
    const obj = {
      description: {
        [KEY_VALUE_SYMBOL]: true,
        de: 'Beschreibung',
        en: 'Description',
        fr: 'Description',
        AIRTABLE_ID: 'recTBdFYcmyHMte7n',
        AIRTABLE_TABLE: 'KeyValue',
      },
      first: 1,
      nested: {
        hello: {
          [KEY_VALUE_SYMBOL]: true,
          de: 'HALLO',
          en: 'HELLO',
          fr: 'Bonjour',
          AIRTABLE_ID: 'hjsdfklgjsdfg89u',
          AIRTABLE_TABLE: 'KeyValue',
        },
        second: 2,
      },
    }

    const res = reduceObjForLang(obj, ['de'])

    expect(res).toEqual({
      description: 'Beschreibung',
      first: 1,
      nested: {
        hello: 'HALLO',
        second: 2,
      },
    })
  })
  test('does not touch strings', () => {
    const obj = {
      description: {
        [KEY_VALUE_SYMBOL]: true,
        de: 'Beschreibung',
        en: 'Description',
        fr: 'Description',
        AIRTABLE_ID: 'recTBdFYcmyHMte7n',
        AIRTABLE_TABLE: 'KeyValue',
      },
      first: 'first',
      nested: {
        hello: {
          [KEY_VALUE_SYMBOL]: true,
          de: 'HALLO',
          en: 'HELLO',
          fr: 'Bonjour',
          AIRTABLE_ID: 'hjsdfklgjsdfg89u',
          AIRTABLE_TABLE: 'KeyValue',
        },
        second: 'second',
      },
    }

    const res = reduceObjForLang(obj, ['de'])

    expect(res).toEqual({
      description: 'Beschreibung',
      first: 'first',
      nested: {
        hello: 'HALLO',
        second: 'second',
      },
    })
  })
  test('does not touch null/undefined values', () => {
    const obj = {
      description: {
        [KEY_VALUE_SYMBOL]: true,
        de: 'Beschreibung',
        en: 'Description',
        fr: 'Description',
        AIRTABLE_ID: 'recTBdFYcmyHMte7n',
        AIRTABLE_TABLE: 'KeyValue',
      },
      first: null,
      nested: {
        hello: {
          [KEY_VALUE_SYMBOL]: true,
          de: 'HALLO',
          en: 'HELLO',
          fr: 'Bonjour',
          AIRTABLE_ID: 'hjsdfklgjsdfg89u',
          AIRTABLE_TABLE: 'KeyValue',
        },
        second: undefined,
      },
    }

    const res = reduceObjForLang(obj, ['de'])

    expect(res).toEqual({
      description: 'Beschreibung',
      first: null,
      nested: {
        hello: 'HALLO',
        second: undefined,
      },
    })
  })
  test('does not touch boolean values', () => {
    const obj = {
      description: {
        [KEY_VALUE_SYMBOL]: true,
        de: 'Beschreibung',
        en: 'Description',
        fr: 'Description',
        AIRTABLE_ID: 'recTBdFYcmyHMte7n',
        AIRTABLE_TABLE: 'KeyValue',
      },
      first: true,
      nested: {
        hello: {
          [KEY_VALUE_SYMBOL]: true,
          de: 'HALLO',
          en: 'HELLO',
          fr: 'Bonjour',
          AIRTABLE_ID: 'hjsdfklgjsdfg89u',
          AIRTABLE_TABLE: 'KeyValue',
        },
        second: false,
      },
    }

    const res = reduceObjForLang(obj, ['de'])

    expect(res).toEqual({
      description: 'Beschreibung',
      first: true,
      nested: {
        hello: 'HALLO',
        second: false,
      },
    })
  })
  test('filles non-defined values with fallback and indicator', () => {
    const obj = {
      description: {
        [KEY_VALUE_SYMBOL]: true,
        de: undefined,
        en: 'Description',
        fr: 'Description',
        AIRTABLE_ID: 'recTBdFYcmyHMte7n',
        AIRTABLE_TABLE: 'KeyValue',
      },
      factsFigures: {
        [KEY_VALUE_SYMBOL]: true,
        de: 'Zahlen & Fakten',
        en: 'Numbers and facts',
        fr: 'Faits et chiffres',
        AIRTABLE_ID: 'rec3rfeCNzOZDcc3I',
        AIRTABLE_TABLE: 'KeyValue',
      },
      factsFigures2: {
        [KEY_VALUE_SYMBOL]: true,
        de: undefined,
        en: '',
        fr: 'Faits et chiffres',
        AIRTABLE_ID: 'rec3rfeCNzOZDcc3I',
        AIRTABLE_TABLE: 'KeyValue',
      },
    }

    const res = reduceObjForLang(obj, ['de', 'en', 'fr'])

    expect(res).toEqual({
      description: 'de:: Description',
      factsFigures: 'Zahlen & Fakten',
      factsFigures2: 'de:: Faits et chiffres',
    })
  })
})
