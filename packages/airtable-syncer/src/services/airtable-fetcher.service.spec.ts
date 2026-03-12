import { keyValueMapping } from '@shiftcode/airtable-mapper'
import { S3Helper } from '@shiftcode/lambda-utilities/s3'
import { Container } from 'inversify'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { bindLoggerToContainer } from '../../test/add-logger-to-container.function.js'
import { AirtableApiMock } from '../../test/airtable.api.mock.js'
import { ComplexModel } from '../../test/models/complex.model.js'
import { SimpleModel } from '../../test/models/simple.model.js'
import { S3HelperMock } from '../../test/s3-helper.mock.js'
import { SnsPublisherMock } from '../../test/sns-publisher.mock.js'
import {
  airtableImgAtt,
  cmItemId,
  complexRecord,
  kvItemId,
  kvRecord,
  smItemId,
  smRecord,
} from '../../test/some-items.js'
import { TEST_ASSET_PREFIX, TestAttachmentUrlResolverService } from '../../test/test-attachment-url-resolver.service.js'
import { AirtableSyncConfig } from '../config/airtable-config.model.js'
import { KEY_VALUE_SYMBOL } from '../model/key-value.symbol.js'
import { AIRTABLE_SYNC_CONFIG } from '../module/airtable-sync-config.symbol.js'
import { AirtableApi } from './airtable.api.js'
import { AirtableFetcher } from './airtable-fetcher.service.js'
import { AttachmentUrlResolver } from './attachment-url-resolver.service.js'
import { SnsPublisher } from './sns-publisher.service.js'

const aBase = 'MyBase'

describe('airtable-fetcher', () => {
  const config: AirtableSyncConfig = {
    airtableSync: {
      apiKey: 'NOT_DEFINED_API_KEY',
      atBucketName: 'NOT_DEFINED_AT_BUCKET_NAME',
      downloadTopic: 'downloadAttachments-xx1',
      supportedLanguages: 'de,en',
      snsTopicRegion: 'sns-topic-region',
    },
  }
  let container: Container
  let airtableFetcher: AirtableFetcher
  let apiMock: AirtableApiMock
  let snsMock: SnsPublisherMock
  let attachmentUrlResolver: AttachmentUrlResolver

  beforeEach(() => {
    container = bindLoggerToContainer(
      new Container({
        autobind: true,
        defaultScope: 'Singleton',
      }),
    )
    container.bind<AirtableSyncConfig>(AIRTABLE_SYNC_CONFIG).toConstantValue(config)
    container.bind(AttachmentUrlResolver).to(TestAttachmentUrlResolverService).inSingletonScope()
    container
      .bind(S3Helper)
      .to(<any>S3HelperMock)
      .inSingletonScope()
    container
      .bind(SnsPublisher)
      .to(<any>SnsPublisherMock)
      .inSingletonScope()
    container
      .bind(AirtableApi)
      .to(<any>AirtableApiMock)
      .inSingletonScope()

    apiMock = container.get<any>(AirtableApi)
    snsMock = container.get<any>(SnsPublisher)
    airtableFetcher = container.get(AirtableFetcher)
    attachmentUrlResolver = container.get(AttachmentUrlResolver)
  })
  afterEach(() => container.unbindAll())

  test('can be injected', () => {
    expect(airtableFetcher).toBeDefined()
  })

  test('init load s3 files according to prefix', async () => {
    await airtableFetcher.init(aBase, TEST_ASSET_PREFIX)
    const s3mock: S3HelperMock = container.get<any>(S3Helper)
    expect(s3mock.listAll).toHaveBeenCalledWith(TEST_ASSET_PREFIX)
  })

  test('throws if not initialized', () => {
    expect.assertions(1)
    return airtableFetcher.fetchAll(keyValueMapping).catch((e: any) => expect(e).toBeDefined())
  })

  test('maps items of requested table [no nested | no converters]', async () => {
    apiMock.fetchAllByTable = vi.fn().mockReturnValue([smRecord])

    await airtableFetcher.init(aBase, TEST_ASSET_PREFIX)
    const res = await airtableFetcher.fetchAll(SimpleModel._mapping)
    expect(apiMock.fetchAllByTable).toHaveBeenCalledWith(
      SimpleModel._mapping.tableName,
      SimpleModel._mapping.fields,
      '',
    )
    expect(res).toEqual([
      {
        AIRTABLE_ID: smItemId,
        AIRTABLE_TABLE: SimpleModel._mapping.tableName,
        ...smRecord.fields,
      },
    ])
  })

  test('maps items of requested table [with nested | with converter | with attachment]', async () => {
    apiMock.fetchAllByTable = vi.fn().mockReturnValueOnce([complexRecord]).mockReturnValueOnce([kvRecord])

    await airtableFetcher.init(aBase, TEST_ASSET_PREFIX)
    const res = await airtableFetcher.fetchAll(ComplexModel._mapping)

    expect(apiMock.fetchAllByTable).toHaveBeenCalledTimes(2)
    expect(snsMock.publishMessageToTopic).toHaveBeenCalledTimes(1)
    expect(snsMock.calls[0][0]).toEqual(config.airtableSync.downloadTopic)
    expect(snsMock.calls[0][1]).toEqual(airtableImgAtt)

    expect(res).toEqual([
      {
        AIRTABLE_ID: cmItemId,
        AIRTABLE_TABLE: ComplexModel._mapping.tableName,
        ...complexRecord.fields,
        active: false,
        title: {
          [KEY_VALUE_SYMBOL]: true,
          AIRTABLE_ID: kvItemId,
          AIRTABLE_TABLE: keyValueMapping.tableName,
          ...kvRecord.fields,
        },
        image: {
          id: airtableImgAtt.id,
          ratio: (airtableImgAtt.thumbnails.large.height / airtableImgAtt.thumbnails.large.width) * 100,
          type: airtableImgAtt.type,
          url: attachmentUrlResolver.createUrl(airtableImgAtt.id, airtableImgAtt.filename),
        },
      },
    ])
  })
})
