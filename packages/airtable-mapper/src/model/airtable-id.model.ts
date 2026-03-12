/**
 * every item type to fetch needs to extend AirtableId.
 */
export abstract class AirtableId {
  /* eslint-disable @typescript-eslint/naming-convention */
  AIRTABLE_ID: string
  AIRTABLE_TABLE: string
  /* eslint-enable @typescript-eslint/naming-convention */
}
