import { AirtableImageAttachment, keyValueMapping } from '@shiftcode/airtable-mapper'
// eslint-disable-next-line @typescript-eslint/naming-convention
import { default as Airtable } from 'airtable'

import { ComplexModel } from './models/complex.model.js'
import { SimpleModel } from './models/simple.model.js'

export const kvItemId = 'key-value-item-id'
export const smItemId = 'simple-mode-item-id'
export const cmItemId = 'complex-model-item-id'

export const airtableImgAtt: AirtableImageAttachment = {
  id: 'attNCOCHulHBoZrQ7',
  url: 'https://dl.airtable.com/.attachments/54affbf839c877e245d59e9569b25230/5bae61a6/ml__0000s_0007_cray.jpg',
  filename: 'ml__0000s_0007_cray.jpg',
  type: 'image/jpeg',
  size: 5583476,
  thumbnails: <any>{
    large: {
      url: 'anUrl',
      width: 512,
      height: 704,
    },
  },
}

export const smRecord = new (<any>Airtable).Record(SimpleModel._mapping.tableName, smItemId, {
  fields: {
    title: 'title',
    description: 'description',
  },
})

export const kvRecord = new (<any>Airtable).Record(keyValueMapping.tableName, kvItemId, {
  fields: {
    de: 'de_test',
    en: 'en_test',
  },
})

export const complexRecord = new (<any>Airtable).Record(ComplexModel._mapping.tableName, cmItemId, {
  fields: {
    title: [kvItemId],
    active: undefined,
    image: [{ ...airtableImgAtt }],
  },
})
