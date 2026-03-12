import { AirtableAttachment, AirtableImageAttachment } from '@shiftcode/airtable-mapper'

export function isAirtableImage(item: AirtableAttachment): item is AirtableImageAttachment {
  return item.thumbnails !== undefined
}
