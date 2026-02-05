import { AirtableModelMapping, MAPPING_MARKER, MAPPING_MARKER__KEY_VALUE } from '@shiftcode/airtable-mapper'
import { LoggerService } from '@shiftcode/inversify-logger'
import { S3Helper } from '@shiftcode/lambda-utilities/s3'
import { Logger } from '@shiftcode/logger'
import { differenceInSeconds } from 'date-fns'
import { inject, injectable } from 'inversify'

import { AirtableSyncConfig } from '../config/airtable-config.model.js'
import { AirtableIdRecord } from '../model/airtable-id-record.model.js'
import { KEY_VALUE_SYMBOL } from '../model/key-value.symbol.js'
import { AIRTABLE_SYNC_CONFIG } from '../module/airtable-sync-config.symbol.js'
import { isAirtableAttachment } from '../static/is-airtable-attachment.function.js'
import { isAirtableImage } from '../static/is-airtable-image.function.js'
import { supportedLanguagesToArray } from '../static/supported-languages-to-array.functions.js'
import { AirtableApi } from './airtable.api.js'
import { AttachmentUrlResolver } from './attachment-url-resolver.service.js'
import { SnsPublisher } from './sns-publisher.service.js'

export interface TableCache {
  lastUpdated: Date
  items: Map<string, AirtableIdRecord>
}

// TODO: 26.05.19 - change logic to handle new airtable updated timestamp

@injectable()
export class AirtableFetcher {
  private static readonly FIELDS_TO_REMOVE_PREFIX = '_'

  // simple cache which stores all records for a table to minimize network calls
  private readonly cache = new Map<string, TableCache>()

  // s3 keys
  private s3Keys: Set<string> = new Set()

  // flag
  private initialized = false

  // supported languages
  private readonly languageFields: string[]
  private readonly logger: Logger

  constructor(
    @inject(AIRTABLE_SYNC_CONFIG) private readonly config: AirtableSyncConfig,
    private attachmentUrlResolver: AttachmentUrlResolver,
    private s3Helper: S3Helper,
    private airtableApi: AirtableApi,
    private snsPublisher: SnsPublisher,
    loggerService: LoggerService,
  ) {
    this.s3Helper.init(this.config.airtableSync.atBucketName)
    this.languageFields = supportedLanguagesToArray(this.config.airtableSync.supportedLanguages)
    this.logger = loggerService.getInstance('AirtableFetcher')
  }

  clearCache() {
    this.cache.clear()
  }

  async init(base: string, s3AssetPrefix: string) {
    this.logger.info(`init(base=${base}, s3AssetPrefix=${s3AssetPrefix})`)
    this.airtableApi.setBase(base)
    const result = await this.s3Helper.listAll(s3AssetPrefix)
    this.s3Keys = new Set(Array.from(result.keys()).map((k) => this.attachmentUrlResolver.getId(k)))
    this.initialized = true
  }

  async fetchAll<T>(map: AirtableModelMapping<T>, ids: string[] = [], filterByFormula = ''): Promise<T[]> {
    if (!this.initialized) {
      throw new Error(
        `service was not initialized. first call "await airtableFetcher.init('YourBase', 'YourS3AssetsPrefix')" --> make sure to await the promise`,
      )
    }
    const res: AirtableIdRecord[] = await this.fetchInternal(map, ids, filterByFormula)
    for (const record of res) {
      for (const [k, mapping] of map.mappings) {
        const key = <string>k // cast keyof T to string
        // applying possible converters also for undefined values
        if (mapping.converter) {
          record[key] = mapping.converter(record[key])
        } else if (record[key] !== undefined) {
          const refs: string[] = <string[]>record[key]
          // possibility for unmapped wrapped types (for instance Attachments)
          const fieldRecords =
            mapping.fieldMapping !== null ? await this.fetchAll(mapping.fieldMapping, refs) : record[key]
          record[key] = mapping.single ? fieldRecords[0] : fieldRecords.reverse()
        }
      }
      // AirtableIdRecord is now actual T (except for KeyValue items which are reduced to a single string later
    }
    return <T[]>(<any>res)
  }

  private async fetchInternal(
    map: AirtableModelMapping<any>,
    ids: string[],
    filterByFormula: string,
  ): Promise<AirtableIdRecord[]> {
    // check if the mapping is marked to be a key value mapping, using symbols here to avoid issues when two different
    // versions of the airtable-mapper package are used
    const isKeyValueMapping = (map as any)[MAPPING_MARKER] === MAPPING_MARKER__KEY_VALUE
    const fields = isKeyValueMapping ? this.languageFields : (map.fields as string[])

    if (!this.cache.has(map.tableName)) {
      this.logger.debug(`fetchInternal::no cache found for TABLE ${map.tableName}`)
      const records = await this.airtableApi.fetchAllByTable(map.tableName, fields, filterByFormula)

      const recordsMap = new Map<string, AirtableIdRecord>()
      for (const r of records) {
        // remove incoming refs and send sns event for attachments to initiate download to S3
        for (const field of Object.keys(r.fields)) {
          if (field.startsWith(AirtableFetcher.FIELDS_TO_REMOVE_PREFIX)) {
            delete r.fields[field]
          }
          await this.checkForAttachment(r.fields[field])
        }
        /**
         * adding symbol to indicate
         * we use this in {@link reduceObjForLang} as a safe way to know which items to reduce
         */
        if (isKeyValueMapping) {
          r.fields[KEY_VALUE_SYMBOL] = true
        }
        r.fields.AIRTABLE_ID = r.getId()
        r.fields.AIRTABLE_TABLE = map.tableName
        recordsMap.set(r.getId(), r.fields)
      }

      this.logger.info(`fetchInternal() fetched ${records.length} records -> adding to cache`)
      this.cache.set(map.tableName, { lastUpdated: new Date(), items: recordsMap })
    } else {
      // FIXME: implement working cache or remove it (see FL project too)

      const cache = this.cache.get(map.tableName)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
      const diff = differenceInSeconds(new Date(), cache.lastUpdated)

      this.logger.debug(`fetchInternal::reading from cache for TABLE ${map.tableName}. differenceInSeconds: ${diff}`)
    }

    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const cachedRecordsMap: Map<string, AirtableIdRecord> = <any>this.cache.get(map.tableName)!.items

    if (ids && Array.isArray(ids) && ids.length) {
      // filter only required ids
      return ids.map((id) => {
        if (cachedRecordsMap.has(id)) {
          // create a copy
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return { ...cachedRecordsMap.get(id)! }
        } else {
          // it's possible that the cache is stalled, we don't try to refresh it
          // TODO: Maybe we have to handle it, but it should only happen if a record gets deleted (not only changed or added) while we're importing (rare case)
          // TODO: It's not possible to add a ref to a none existing record (inside airtable)
          // TODO can also happen if there are filters accidentaly applied to the default «scView»
          // todo: if table was fetched with a formula, not all (later requested) records might be in the cache.
          //  --> fix: store how the records were fetched, if with formula, fetch single record from airtable
          this.logger.error(
            `fetchInternal() ERROR -> A Record with ID: ${id} for TABLE:${map.tableName} is missing in cache`,
          )
          throw new Error(`fetchInternal() Record with ID: ${id} for table ${map.tableName} is missing in cache`)
        }
      })
    } else {
      // create a copy
      return Array.from(cachedRecordsMap.values()).map((a) => ({ ...a }))
    }
  }

  private async checkForAttachment(attachment: any[]) {
    if (Array.isArray(attachment)) {
      for (const possibleAtt of attachment) {
        if (isAirtableAttachment(possibleAtt)) {
          // if attachment is not yet on s3 send sns event to initiate download
          if (!this.s3Keys.has(possibleAtt.id)) {
            try {
              const msgId = await this.snsPublisher.publishMessageToTopic(this.config.airtableSync.downloadTopic, {
                ...possibleAtt,
              })
              this.logger.debug(`sent sns request with id: ${msgId} for: ${possibleAtt.id}'`)
            } catch (e) {
              try {
                const str = JSON.stringify(possibleAtt)
                if (e instanceof Error) {
                  this.logger.error(`failed to send sns request (${str}) for: ${possibleAtt?.id} (${e.name})`, e)
                } else {
                  this.logger.error(`failed to send sns request (${str}) for: ${possibleAtt?.id}`, e)
                }
              } catch (e) {
                this.logger.error(`failed to send sns request (can't JSON.stringify) for: ${possibleAtt?.id}`, e)
              }
            }
          } else {
            this.logger.debug(`attachment ${possibleAtt.id} is already on S3`)
          }
          // rewrite URL
          possibleAtt.url = this.attachmentUrlResolver.createUrl(possibleAtt.id, possibleAtt.filename)
          // add metadata
          if (isAirtableImage(possibleAtt)) {
            /* eslint-disable @typescript-eslint/ban-ts-comment */

            /** add info to fulfill the {@link ImageAttachment} type */
            // @ts-ignore
            possibleAtt.ratio = (possibleAtt.thumbnails.large.height / possibleAtt.thumbnails.large.width) * 100
            // fixme
            // @ts-ignore
            delete possibleAtt.thumbnails
          }
          // fixme
          // @ts-ignore
          delete possibleAtt.filename
          // fixme
          // @ts-ignore
          delete possibleAtt.size

          /* eslint-enable @typescript-eslint/ban-ts-comment */
        }
      }
    }
  }
}
