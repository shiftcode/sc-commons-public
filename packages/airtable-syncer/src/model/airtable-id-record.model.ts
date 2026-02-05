import { AirtableId } from '@shiftcode/airtable-mapper'

/**
 * Airtable Record Model with known and unknown properties
 */
export interface AirtableIdRecord extends AirtableId {
  [key: string]: any
}
