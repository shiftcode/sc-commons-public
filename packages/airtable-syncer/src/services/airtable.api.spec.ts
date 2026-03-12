import { Container } from 'inversify'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { bindLoggerToContainer } from '../../test/add-logger-to-container.function.js'
import { AirtableMock } from '../../test/airtable.mock.js'
import { AirtableSyncConfig } from '../config/airtable-config.model.js'
import { AIRTABLE_SYNC_CONFIG } from '../module/airtable-sync-config.symbol.js'
import { AirtableApi } from './airtable.api.js'

const aBase = 'MyBase'
const aTable = 'MyTable'
const anItemId = 'MyItemId'
const aRecord = {
  KEY: 'HI',
}
let container: Container
const config: AirtableSyncConfig = {
  airtableSync: {
    apiKey: 'NOT_DEFINED_API_KEY',
    atBucketName: 'NOT_DEFINED_AT_BUCKET_NAME',
    downloadTopic: 'downloadAttachments-xx1',
    supportedLanguages: 'de,en',
    snsTopicRegion: 'sns-topic-region',
  },
}

describe('airtable.api', () => {
  let airtableMock: AirtableMock
  let airtableApi: AirtableApi

  beforeEach(() => {
    container = bindLoggerToContainer(
      new Container({
        autobind: true,
        defaultScope: 'Singleton',
      }),
    )
    container.bind<AirtableSyncConfig>(AIRTABLE_SYNC_CONFIG).toConstantValue(config)
    airtableApi = container.get(AirtableApi)
    airtableMock = new AirtableMock()
    Object.assign(airtableApi, { airtable: airtableMock })
  })
  afterEach(() => container.unbindAll())

  test('should select on given table on the initalized base', () => {
    airtableApi.setBase(aBase)
    void airtableApi.fetchAllByTable(aTable, [], '')
    expect(airtableMock.base).toHaveBeenCalledWith(aBase)
    expect(airtableMock.mockedBase).toHaveBeenCalledWith(aTable)
    expect(airtableMock.mockedTable.select).toHaveBeenCalled()
  })

  test('createItem', async () => {
    airtableApi.setBase(aBase)
    await airtableApi.createItem(aTable, aRecord)
    expect(airtableMock.mockedTable.create).toBeCalledWith(aRecord)
  })
  test('readItem', async () => {
    airtableApi.setBase(aBase)
    await airtableApi.readItem(aTable, anItemId)
    expect(airtableMock.mockedTable.find).toBeCalledWith(anItemId)
  })
  test('updateItem', async () => {
    airtableApi.setBase(aBase)
    await airtableApi.updateItem(aTable, anItemId, aRecord)
    expect(airtableMock.mockedTable.update).toBeCalledWith(anItemId, aRecord)
  })
  test('deleteItem', async () => {
    airtableApi.setBase(aBase)
    await airtableApi.deleteItem(aTable, anItemId)
    expect(airtableMock.mockedTable.destroy).toBeCalledWith(anItemId)
  })
})
