import {
  AirtableId,
  AirtableMapping,
  booleanConverter,
  ImageAttachment,
  keyValueMapping,
  KeyValueString,
} from '@shiftcode/airtable-mapper'

export class ComplexModel extends AirtableId {
  static _mapping = new AirtableMapping<ComplexModel>('ComplexModel')
    .addMapping('title', keyValueMapping, true)
    .addMapping('active', null, true, booleanConverter)
    .addMapping('image', null, true)

  title!: KeyValueString

  active!: boolean

  image!: ImageAttachment
}
