import { AirtableId } from '../model/airtable-id.model.js'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type KeyValueLanguageKeys = 'de' | 'en' | 'fr' | 'it' | 'nl' | string

export type KeyValuePerLanguage = { [key in KeyValueLanguageKeys]: string }

export type KeyValue = AirtableId & KeyValuePerLanguage
