import { AirtableId, AirtableMapping } from '@shiftcode/airtable-mapper'

export class SimpleModel extends AirtableId {
  static _mapping = new AirtableMapping<SimpleModel>('SimpleModel').addFields(['title', 'description'])

  title!: string
  description!: string
}
