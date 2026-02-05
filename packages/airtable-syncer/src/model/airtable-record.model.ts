/**
 * actual returned record type - unfortunately missing in @types/airtable
 */
export interface AirtableRecord<T> {
  id: string
  fields: T

  getId(): string

  get(columnName: keyof T | string): any
}
