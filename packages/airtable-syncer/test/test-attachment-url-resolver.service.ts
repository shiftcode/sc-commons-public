import { inject, injectable } from 'inversify'

import { AIRTABLE_SYNC_CONFIG, AirtableSyncConfig, AttachmentUrlResolver } from '../src/index.js'

export const TEST_ASSET_PREFIX = 'test-assets/'

@injectable()
export class TestAttachmentUrlResolverService extends AttachmentUrlResolver {
  private get prefix(): string {
    return `/${TEST_ASSET_PREFIX}`
  }

  constructor(@inject(AIRTABLE_SYNC_CONFIG) private config: AirtableSyncConfig) {
    super()
  }

  createUrl(id: string, filename: string): string {
    return `${this.prefix}${filename}`
  }

  getId(url: string): string {
    if (url.indexOf(this.prefix) !== 0) {
      throw new Error('Foo Bar')
    }
    return url.slice(this.prefix.length)
  }
}
