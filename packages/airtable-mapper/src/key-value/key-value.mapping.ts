import { AirtableMapping, AirtableModelMapping } from '../mapping/airtable-mapping.model.js'

/**
 * used to mark a {@link AirtableMapping} as a KeyValueMapping, this information is later used by the airtable-fetcher
 * {@link AirtableFetcher#fetchInternal} to fetch the fields specified in {@link AirtableSyncConfig#supportedLanguages
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MAPPING_MARKER__KEY_VALUE = Symbol.for('SC_AIRTABLE_MAPPING__MAPPING_MARKER__KEY_VALUE')

/**
 * special symbol which marks a {@link AirtableMapping} as a dedicated type
 */
export const MAPPING_MARKER = Symbol.for('SC_AIRTABLE_MAPPING__MAPPING_MARKER')

/**
 * TODO: desc
 * fetches the fields specified in {@link AirtableSyncConfig#supportedLanguages} from airtable
 */
const kvMapping = new AirtableMapping<KeyValueString>('KeyValue')

// mark the mapping to later be used as identifier by airtable-fetcher

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
kvMapping[MAPPING_MARKER] = MAPPING_MARKER__KEY_VALUE

export const keyValueMapping: AirtableModelMapping<KeyValueString> = kvMapping

/**
 * TODO: desc
 */
export type KeyValueString = string
