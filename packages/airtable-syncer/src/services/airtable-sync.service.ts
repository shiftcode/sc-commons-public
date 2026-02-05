import { AirtableId, AirtableModelMapping } from '@shiftcode/airtable-mapper'
import { LoggerService } from '@shiftcode/inversify-logger'
import { S3Helper } from '@shiftcode/lambda-utilities/s3'
import { Logger } from '@shiftcode/logger'
import { inject, injectable } from 'inversify'

import { AirtableSyncConfig } from '../config/airtable-config.model.js'
import { AIRTABLE_SYNC_CONFIG } from '../module/airtable-sync-config.symbol.js'
import { batchTasks } from '../static/batch-tasks.function.js'
import { reduceObjForLang } from '../static/reduce-obj-for-lang.function.js'
import { supportedLanguagesToArray } from '../static/supported-languages-to-array.functions.js'
import { AirtableFetcher } from './airtable-fetcher.service.js'

export type NameFunction = (object: any) => string

export type TransformFunction = (records: any[][]) => any

export interface AirtableToS3 {
  mapping: Array<AirtableModelMapping<any>>
  s3KeyOrPrefix: string
  s3NameProperty?: string | NameFunction // if defined the specified property value will be used as name for the .json file
  transformOrFilter?: TransformFunction
  unwrap?: boolean
}

@injectable()
export class AirtableSync {
  s3DataPrefix: string
  s3AssetPrefix: string
  private readonly logger: Logger

  constructor(
    @inject(AIRTABLE_SYNC_CONFIG) private readonly config: AirtableSyncConfig,
    private s3Helper: S3Helper,
    private airtableFetcher: AirtableFetcher,
    loggerService: LoggerService,
  ) {
    this.s3Helper.init(this.config.airtableSync.atBucketName)
    this.logger = loggerService.getInstance('AirtableSync')
  }

  init(s3AssetPrefix: string, s3DataPrefix: string) {
    this.s3DataPrefix = s3DataPrefix
    this.s3AssetPrefix = s3AssetPrefix
  }

  async syncModels(airtableBase: string, modelsToSync: AirtableToS3[], s3Prefix: string) {
    if (!Array.isArray(modelsToSync)) {
      throw new Error('given modelsToFetch is not an array')
    }

    this.logger.info(`fetchModels`, {
      base: airtableBase,
      modelsToFetch: modelsToSync.map((m) => m.s3KeyOrPrefix),
      s3Prefix,
    })

    this.airtableFetcher.clearCache()
    await this.airtableFetcher.init(airtableBase, this.s3AssetPrefix)

    // start fetching
    const supportedLanguages = this.config.airtableSync.supportedLanguages
    const uploadTasks: Array<() => Promise<any>> = []
    for (const mtf of modelsToSync) {
      this.logger.debug(`fetchModel ${mtf.s3KeyOrPrefix}`)
      // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
      let result: any | AirtableId[][] = []
      for (const typeMapping of mtf.mapping) {
        const records = await this.airtableFetcher.fetchAll<AirtableId>(typeMapping)
        result.push(records)
      }
      if (mtf.transformOrFilter) {
        result = mtf.transformOrFilter(result)
      } else {
        result = result[0]
      }

      if (result) {
        const keyBase = `${this.s3DataPrefix}${s3Prefix}${mtf.s3KeyOrPrefix}`
        if (mtf.unwrap) {
          for (const unwrappedResult of result) {
            const s3NameProperty: string =
              typeof mtf.s3NameProperty === 'function'
                ? mtf.s3NameProperty(unwrappedResult)
                : (mtf.s3NameProperty && unwrappedResult[mtf.s3NameProperty]) || unwrappedResult.AIRTABLE_ID

            const key = `${keyBase}${s3NameProperty}`
            uploadTasks.push(...this.getUploadPerLanguageTask(unwrappedResult, key, supportedLanguages))
          }
        } else {
          uploadTasks.push(...this.getUploadPerLanguageTask(result, keyBase, supportedLanguages))
        }
      }
    }

    this.logger.debug(`${uploadTasks.length} upload tasks ready to be executed`)

    // S3 can handle 3500 upload requests per second for individual partitioned S3 prefix
    // (https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html).
    // Since the sync task is usually not time critical we still use a very simple implementation
    // without handling individual limits per partitioned S3 prefix and observing the timing, we just provide a static value
    // For now we use 50 as the aws sdk max sockets is set to 50 by default
    // See: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html
    for await (const task of batchTasks(uploadTasks, 50)) {
      this.logger.debug(
        `batch executed -> ok: ${task.filter((s) => s.status === 'fulfilled').length} / error: ${task.filter((s) => s.status === 'rejected').length}`,
      )
    }
  }

  private getUploadPerLanguageTask(result: any, key: string, supportedLanguages: string): Array<() => Promise<any>> {
    // remove json type suffix if it's there
    if (/\.json$/.test(key)) {
      key = key.substring(0, key.length - 5)
    }
    const languageFields = supportedLanguagesToArray(supportedLanguages)

    return languageFields.map((lang) => {
      return () => {
        return this.s3Helper
          .uploadJson(reduceObjForLang(result, [lang, ...languageFields]), `${key}_${lang}.json`)
          .catch((err) => {
            this.logger.error(`Failed to upload to s3: ${key}_${lang}.json`, err)
            throw err
          })
      }
    })
  }
}
