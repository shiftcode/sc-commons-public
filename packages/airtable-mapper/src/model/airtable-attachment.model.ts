export interface AirtableThumbnail {
  url: string
  width: number
  height: number
}

export interface AirtableThumbnails {
  full: AirtableThumbnail
  small: AirtableThumbnail
  large: AirtableThumbnail
}

/**
 * properties always available on an attachment
 */
export interface AirtableAttachmentProps {
  id: string
  url: string
  filename: string
  type: string // content type, e.g. "image/jpeg"
  size: number
}

/**
 * properties available on an attachment if image
 */
export interface AirtableImageAttachmentProps {
  thumbnails: AirtableThumbnails
}

export type AirtableAttachment = AirtableAttachmentProps & Partial<AirtableImageAttachmentProps>
export type AirtableImageAttachment = AirtableAttachmentProps & AirtableImageAttachmentProps
