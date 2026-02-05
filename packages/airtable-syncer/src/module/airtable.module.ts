import { S3Helper } from '@shiftcode/lambda-utilities/s3'
import { ContainerModule } from 'inversify'

import { AirtableApi } from '../services/airtable.api.js'
import { AirtableFetcher } from '../services/airtable-fetcher.service.js'
import { AirtableSync } from '../services/airtable-sync.service.js'
import { SnsPublisher } from '../services/sns-publisher.service.js'

/**
 * binds airtable services and - if not already bound - S3Helper and SnsPublisher
 */
export const airtableModule = new ContainerModule(({ bind, isBound }) => {
  bind(AirtableFetcher).toSelf().inSingletonScope()
  bind(AirtableSync).toSelf().inSingletonScope()
  bind(AirtableApi).toSelf().inSingletonScope()

  if (!isBound(S3Helper)) {
    bind(SnsPublisher).toSelf().inSingletonScope()
  }

  if (!isBound(S3Helper)) {
    bind(S3Helper).toSelf().inSingletonScope()
  }
})
