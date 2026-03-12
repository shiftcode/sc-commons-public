export interface Attachment {
  id: string
  url: string
  type: string
}

export interface ImageAttachment extends Attachment {
  ratio: number
}
