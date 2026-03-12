# airtable-syncer

> 🎯 Target runtime: es2024 ([Node >= 24](https://node.green/#ES2024))

Module to sync airtable data to S3 and publish SNS events for all attachments found and not yet synced to S3. Usually
those events are consumed by a lambda function creating different sizes of the images and storing them in S3.

## Usage

- provide `AirtableSyncConfig` bound to the `AIRTABLE_SYNC_CONFIG` symbol
- provide an implementation for the AttachmentUrlResolver

```typescript
import { AttachmentUrlResolver, AIRTABLE_SYNC_CONFIG, AirtableSyncConfig } from '@shiftcode/airtable-syncer'
import { Container } from 'inversify'
import { configCreaterFn, ServiceConfig } from './config.js'
import { ServiceAttachmentUrlResolver } from './attachment-url-resolver.service.js'

const con = new Container({
  defaultScope: 'Singleton',
  autoBindInjectable: true,
})

con.bind<AirtableSyncConfig>(AIRTABLE_SYNC_CONFIG).toDynamicValue(configCreaterFn).inSingletonScope()

con.bind(AttachmentUrlResolver).to(ServiceAttachmentUrlResolver).inSingletonScope()
```

- define the sns event and function in serverless.yml to download attachments from airtable and upload them to s3
