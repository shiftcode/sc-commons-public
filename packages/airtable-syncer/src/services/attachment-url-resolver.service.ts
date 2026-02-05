import { injectable } from 'inversify'

@injectable()
export abstract class AttachmentUrlResolver {
  abstract createUrl(id: string, filename: string): string

  abstract getId(s3Key: string): string
}
