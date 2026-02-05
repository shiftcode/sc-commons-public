import { get } from 'node:https'
import { Readable, Stream } from 'node:stream'

import {
  _Object as S3Object,
  GetObjectCommand,
  GetObjectCommandOutput,
  ListObjectsV2CommandInput,
  paginateListObjectsV2,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3'
import { LoggerService } from '@shiftcode/inversify-logger'
import { Logger } from '@shiftcode/logger'
import { injectable } from 'inversify'

@injectable()
export class S3Helper {
  private static cacheNeverExpire = 'max-age=31536000'

  private readonly s3Client: S3Client
  private bucket: string
  private cloudFrontMaxAge: string
  private mustRevalidate: string
  private logger: Logger

  constructor(loggerService: LoggerService) {
    this.logger = loggerService.getInstance('S3Helper')
    this.s3Client = new S3Client({})
  }

  init(bucket: string, maxAge = 300) {
    this.bucket = bucket
    this.mustRevalidate = `max-age=${maxAge}, must-revalidate`
    this.cloudFrontMaxAge = `s-maxage=${maxAge}`
  }

  async listAll(prefix: string): Promise<Map<string, S3Object>> {
    this.checkIfInitializedOrThrow()
    const startTime = Date.now()
    this.logger.debug('starting list all objects on bucket')

    const reqConfig: ListObjectsV2CommandInput = {
      Bucket: this.bucket,
      Prefix: prefix,
    }
    const result = new Map<string, S3Object>()

    const paginator = paginateListObjectsV2({ client: this.s3Client }, reqConfig)
    for await (const res of paginator) {
      if (res.Contents) {
        res.Contents.filter((obj) => !!obj.Key).forEach((obj) => result.set(<string>obj.Key, obj))
      }
    }

    const requestDuration = Date.now() - startTime
    this.logger.info(`listing all s3 assets took ${requestDuration}ms`)
    return result
  }

  async downloadJson<T>(key: string): Promise<T | undefined> {
    const data = await this.readStreamDownload(key)
    return <T | undefined>(data ? JSON.parse(data) : undefined)
  }

  async downloadUrlAndSave(
    url: string,
    key: string,
    contentType: string,
    neverExpires = true,
  ): Promise<PutObjectCommandOutput> {
    const result: Buffer = await this.httpsGet(url)
    return this.upload(key, result, contentType, neverExpires)
  }

  uploadJson(object: any, key: string, neverExpires = false): Promise<PutObjectCommandOutput> {
    const buffer = Buffer.from(JSON.stringify(object), 'utf-8')
    return this.upload(key, buffer, 'application/json', neverExpires)
  }

  async readStream(key: string): Promise<[GetObjectCommandOutput['Body'], string | undefined]> {
    this.checkIfInitializedOrThrow()
    const cmd = new GetObjectCommand({ Bucket: this.bucket, Key: key })
    const res = await this.s3Client.send(cmd)

    return [res.Body, res.ContentEncoding]
  }

  async readStreamDownload(key: string): Promise<string | undefined> {
    this.checkIfInitializedOrThrow()
    const [stream, encoding] = await this.readStream(key)
    if (!stream) {
      return undefined
    }

    return stream.transformToString(encoding)
  }

  async upload(
    key: string,
    body: Buffer | Readable,
    contentType: string,
    neverExpires: boolean,
  ): Promise<PutObjectCommandOutput> {
    this.checkIfInitializedOrThrow()

    const commandInput: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: neverExpires ? S3Helper.cacheNeverExpire : `${this.mustRevalidate}, ${this.cloudFrontMaxAge}`,
    }

    /*
     * must be provided if the size of the body cannot be determined automatically, namely for streams:
     * https://docs.aws.amazon.com/codeguru/detector-library/java/s3-object-metadata-content-length-check/
     * If you run into problems with streams. Consider using SdkStream `@smithy/util-stream` (sdkStreamMixin).
     */
    if (body instanceof Stream) {
      commandInput.ContentLength = body.readableLength
    }

    try {
      this.logger.info(`Start uploading to s3: ${key}`)
      const response = await this.s3Client.send(new PutObjectCommand(commandInput))
      this.logger.info(`Successfully uploaded to s3: ${key}`)
      return response
    } catch (err) {
      this.logger.error(`Failed uploading to s3: ${key}`, err)
      throw err
    }
  }

  private httpsGet(url: string): Promise<Buffer> {
    this.logger.info(`download GET: ${url}`)

    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = []
      get(url, (res) => {
        res.on('data', (chunk) => chunks.push(chunk))
        res.once('end', () => resolve(Buffer.concat(chunks)))
        res.once('error', reject)
      })
    })
  }

  private checkIfInitializedOrThrow() {
    if (!this.bucket) {
      throw new Error(`S3Helper was not initialized. First call "s3Helper.init('MyBucketName')" `)
    }
  }
}
