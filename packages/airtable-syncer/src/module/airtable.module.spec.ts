import { S3Helper } from '@shiftcode/lambda-utilities/s3'
import { Container } from 'inversify'
import { describe, expect, test } from 'vitest'

import { bindLoggerToContainer } from '../../test/add-logger-to-container.function.js'
import { S3HelperMock } from '../../test/s3-helper.mock.js'
import { SnsPublisherMock } from '../../test/sns-publisher.mock.js'
import { AirtableSyncConfig } from '../config/airtable-config.model.js'
import { AirtableApi } from '../services/airtable.api.js'
import { AirtableFetcher } from '../services/airtable-fetcher.service.js'
import { AirtableSync } from '../services/airtable-sync.service.js'
import { SnsPublisher } from '../services/sns-publisher.service.js'
import { airtableModule } from './airtable.module.js'
import { AIRTABLE_SYNC_CONFIG } from './airtable-sync-config.symbol.js'

const config: AirtableSyncConfig = {
  airtableSync: {
    apiKey: 'NOT_DEFINED_API_KEY',
    atBucketName: 'NOT_DEFINED_AT_BUCKET_NAME',
    downloadTopic: 'downloadAttachments-xx1',
    supportedLanguages: 'de,en',
    snsTopicRegion: 'sns-topic-region',
  },
}

describe('airtable inversify module', () => {
  describe('binds all services when loading module only', () => {
    const con = new Container()
    void con.load(airtableModule)

    test('S3Helper', () => expect(con.isBound(S3Helper)).toBeTruthy())
    test('SnsPublisher', () => expect(con.isBound(SnsPublisher)).toBeTruthy())
    test('AirtableApi', () => expect(con.isBound(AirtableApi)).toBeTruthy())
    test('AirtableFetcher', () => expect(con.isBound(AirtableFetcher)).toBeTruthy())
    test('AirtableSync', () => expect(con.isBound(AirtableSync)).toBeTruthy())
  })
  describe('binds all services when loading S3 or SNS are already bound', () => {
    const con = new Container()
    con.bind<AirtableSyncConfig>(AIRTABLE_SYNC_CONFIG).toConstantValue(config)
    bindLoggerToContainer(con)
    con
      .bind(S3Helper)
      .to(<any>S3HelperMock)
      .inSingletonScope()
    con
      .bind(SnsPublisher)
      .to(<any>SnsPublisherMock)
      .inSingletonScope()
    void con.load(airtableModule)

    test('S3Helper bound to Mock', () => {
      expect(con.isBound(S3Helper)).toBeTruthy()
      expect(con.get(S3Helper)).toBeInstanceOf(S3HelperMock)
    })
    test('SnsPublisher bound to Mock', () => {
      expect(con.isBound(SnsPublisher)).toBeTruthy()
      expect(con.get(SnsPublisher)).toBeInstanceOf(SnsPublisherMock)
    })
    test('AirtableApi', () => expect(con.isBound(AirtableApi)).toBeTruthy())
    test('AirtableFetcher', () => expect(con.isBound(AirtableFetcher)).toBeTruthy())
    test('AirtableSync', () => expect(con.isBound(AirtableSync)).toBeTruthy())
  })
})
