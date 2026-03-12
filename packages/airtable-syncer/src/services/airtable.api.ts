import { LoggerService } from '@shiftcode/inversify-logger'
import { Logger } from '@shiftcode/logger'
// eslint-disable-next-line @typescript-eslint/naming-convention
import Airtable from 'airtable'
import { inject, injectable } from 'inversify'
// eslint-disable-next-line @typescript-eslint/naming-convention
import PQueue from 'p-queue'

import { AirtableSyncConfig } from '../config/airtable-config.model.js'
import { AirtableRecord } from '../model/airtable-record.model.js'
import { AIRTABLE_SYNC_CONFIG } from '../module/airtable-sync-config.symbol.js'

@injectable()
export class AirtableApi {
  private static readonly ENDPOINT_URL = 'https://api.airtable.com'
  private baseName: string
  private base: Airtable.Base
  private readonly airtable: Airtable
  private readonly logger: Logger
  /** A rate-limiting queue to avoid hitting Airtable API limits, executing max 5 requests per second. */
  private readonly queue = new PQueue({ concurrency: 5, interval: 1000, intervalCap: 5, carryoverIntervalCount: true })

  constructor(
    @inject(AIRTABLE_SYNC_CONFIG) private readonly config: AirtableSyncConfig,
    loggerService: LoggerService,
  ) {
    this.logger = loggerService.getInstance('AirtableApi')
    this.airtable = new Airtable({
      apiKey: this.config.airtableSync.apiKey,
      endpointUrl: AirtableApi.ENDPOINT_URL,
      noRetryIfRateLimited: true,
    })
  }

  setBase(base: string): void {
    this.baseName = base
    this.base = this.airtable.base(base)
  }

  async createItem(tableName: string, item: any): Promise<any> {
    return this.base(tableName).create(item)
  }

  async readItem(tableName: string, airtableId: string): Promise<any> {
    return this.base(tableName).find(airtableId)
  }

  async updateItem(tableName: string, airtableId: string, item: any): Promise<any> {
    return this.base(tableName).update(airtableId, item)
  }

  async deleteItem(tableName: string, airtableId: string): Promise<any> {
    return this.base(tableName).destroy(airtableId)
  }

  fetchAllByTable(tableName: string, fields: string[], filterByFormula: string): Promise<Array<AirtableRecord<any>>> {
    return this.queue.add(async () => {
      this.logger.info(`fetching table: ${tableName} on base ${this.baseName}`)
      const startTime = Date.now()
      const records: Array<Airtable.Record<any>> = []
      const selectOptions: Airtable.SelectOptions<any> = { pageSize: 100, view: 'scView', fields, filterByFormula }
      try {
        this.logger.debug('fetching with select options:', selectOptions)
        await this.base(tableName)
          .select(selectOptions)
          // we use eachPage because we deactivated retry on the airtable client (see constructor) - reason 5s limit
          .eachPage((pageRecords: Airtable.Records<any>, next: any) => {
            records.push(...pageRecords)
            next()
          })
      } catch (err) {
        this.logger.error(`Airtable Error while fetching table ${tableName}:`, { selectOptions }, err)
        throw err
      }
      const requestDuration = Date.now() - startTime
      this.logger.info(`fetching of ${tableName} took: ${requestDuration} ms`)
      return records
    })
  }
}
