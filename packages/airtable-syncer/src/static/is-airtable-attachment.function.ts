import { AirtableAttachment } from '@shiftcode/airtable-mapper'

export function isAirtableAttachment(item: any): item is AirtableAttachment {
  return <boolean>(
    (item &&
      (<AirtableAttachment>item).id !== undefined &&
      (<AirtableAttachment>item).filename !== undefined &&
      (<AirtableAttachment>item).url !== undefined)
  )
}
