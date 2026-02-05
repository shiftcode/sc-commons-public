import { keyValueMapping } from '@shiftcode/airtable-mapper'
import { S3Helper } from '@shiftcode/lambda-utilities/s3'
import { Container } from 'inversify'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { bindLoggerToContainer } from '../../test/add-logger-to-container.function.js'
import { AirtableFetcherMock } from '../../test/airtable-fetcher.mock.js'
import { ComplexModel } from '../../test/models/complex.model.js'
import { S3HelperMock } from '../../test/s3-helper.mock.js'
import { airtableImgAtt, cmItemId, complexRecord, kvItemId, kvRecord } from '../../test/some-items.js'
import { TestAttachmentUrlResolverService } from '../../test/test-attachment-url-resolver.service.js'
import { AirtableSyncConfig } from '../config/airtable-config.model.js'
import { KEY_VALUE_SYMBOL } from '../model/key-value.symbol.js'
import { AIRTABLE_SYNC_CONFIG } from '../module/airtable-sync-config.symbol.js'
import { AirtableFetcher } from './airtable-fetcher.service.js'
import { AirtableSync } from './airtable-sync.service.js'
import { AttachmentUrlResolver } from './attachment-url-resolver.service.js'

const ASSET_PREFIX = 'test-assets/'
const DATA_PREFIX = 'test-data/'
const CONTENT_PREFIX = 'content/'
const AT_BASE = 'test-base'
const A_NAME = 'test-name'

describe('Airtable Sync', () => {
  let con: Container
  let sync: AirtableSync
  let attResolver: AttachmentUrlResolver
  let s3Mock: S3HelperMock
  let fetcherMock: AirtableFetcherMock
  beforeEach(() => {
    con = bindLoggerToContainer(new Container({ autobind: true, defaultScope: 'Singleton' }))
    con.bind(AIRTABLE_SYNC_CONFIG).toConstantValue({
      airtableSync: {
        atBucketName: 'bucket-name',
        supportedLanguages: 'de, en',
        apiKey: 'api-key',
        downloadTopic: 'download-topic',
        snsTopicRegion: 'sns-topic-region',
      },
    } satisfies AirtableSyncConfig)
    con
      .bind(S3Helper)
      .to(<any>S3HelperMock)
      .inSingletonScope()
    con.bind(AttachmentUrlResolver).to(TestAttachmentUrlResolverService).inSingletonScope()
    con
      .bind(AirtableFetcher)
      .to(<any>AirtableFetcherMock)
      .inSingletonScope()
    attResolver = con.get(AttachmentUrlResolver)
    s3Mock = con.get<any>(S3Helper)
    fetcherMock = con.get<any>(AirtableFetcher)
    sync = con.get(AirtableSync)
  })

  test('reduces key-values for all languages', async () => {
    fetcherMock.fetchAll = vi.fn().mockReturnValue([
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
          url: attResolver.createUrl(airtableImgAtt.id, airtableImgAtt.filename),
        },
      },
    ])
    sync.init(ASSET_PREFIX, DATA_PREFIX)
    const resultPromise = sync.syncModels(
      AT_BASE,
      [
        {
          s3KeyOrPrefix: A_NAME,
          mapping: [ComplexModel._mapping],
        },
      ],
      CONTENT_PREFIX,
    )

    expect(resultPromise).toBeInstanceOf(Promise)
    await resultPromise

    expect(fetcherMock.clearCache).toBeCalledTimes(1)
    expect(fetcherMock.init).toBeCalledWith(AT_BASE, ASSET_PREFIX)
    expect(fetcherMock.fetchAll).toBeCalledWith(ComplexModel._mapping)
    expect(s3Mock.uploadJson).toHaveBeenCalledTimes(2)

    expect(s3Mock.uploadJsonCalls[0][0]).toBeInstanceOf(Array)
    expect(s3Mock.uploadJsonCalls[0][0][0]).toBeDefined()
    expect(s3Mock.uploadJsonCalls[0][0][0].title).toBe('de_test')
    expect(s3Mock.uploadJsonCalls[0][1]).toBe('test-data/content/test-name_de.json')

    expect(s3Mock.uploadJsonCalls[1][0]).toBeInstanceOf(Array)
    expect(s3Mock.uploadJsonCalls[1][0][0]).toBeDefined()
    expect(s3Mock.uploadJsonCalls[1][0][0].title).toBe('en_test')
    expect(s3Mock.uploadJsonCalls[1][1]).toBe('test-data/content/test-name_en.json')
  })
})
