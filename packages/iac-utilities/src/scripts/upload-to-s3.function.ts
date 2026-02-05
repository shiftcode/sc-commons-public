import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

import { DeleteObjectsCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Ajv, ValidateFunction } from 'ajv'
import glob from 'fast-glob'
import mime from 'mime'

// keep import so it's copied to the dist folder
// eslint-disable-next-line import/no-internal-modules
import s3DefinitionSchema from '../json-schemas/s3-upload-definition-schema.json' with { type: 'json' }
import { colorize, readFromStackOutput } from './script-utils.js'

export const S3_UPLOAD_DEFINITION_SCHEMA_NAME = '@shiftcode/iac-helper/s3-upload-definition-schema.json'

type S3UploadDefSchemaName = `${string}${typeof S3_UPLOAD_DEFINITION_SCHEMA_NAME}`

/**
 * this type reflects the json schema of {@link ./s3-upload-definition-schema.json}
 */
interface S3UploadDefinitionFile {
  $schema: S3UploadDefSchemaName
  definitions: S3UploadDefinition[]
}

interface S3UploadDefinition {
  include: string[]
  cacheControl: string
  contentType?: string
}

const info: Console['log'] = (...a: any[]) => console.log('publishClientToS3 ::', ...a)

const client = new S3Client({})

export interface UploadToS3Options {
  dir: string
  outputs: string
  key: string
  prune: boolean
  definitions: string
  dry: boolean
  verbose: boolean
}

export async function uploadToS3(options: UploadToS3Options | Promise<UploadToS3Options>) {
  const opts = await options
  const dryMode = opts.dry
  const log: Console['log'] =
    opts.verbose || opts.dry ? (...a: any[]) => console.log('publishClientToS3 ::', ...a) : () => {}

  if (!existsSync(opts.dir)) {
    throw new Error(`sync dir '${opts.dir}' does not exist.`)
  }

  const { definitions } = await readDefinitionsFile(opts.definitions)
  const s3Bucket = await readFromStackOutput(opts.outputs, opts.key)

  if (dryMode) {
    console.debug(colorize.important(`=== DRY MODE ===`))
  }

  if (opts.prune) {
    info(`clear 's3://${s3Bucket}'`)
    await clearBucket(s3Bucket, undefined, dryMode, log)
  }

  info(`upload to 's3://${s3Bucket}'`)
  for (const def of definitions) {
    await upload(s3Bucket, opts.dir, def, dryMode, log)
  }

  return 'DONE'
}

async function readDefinitionsFile(fileName: string): Promise<S3UploadDefinitionFile> {
  if (!existsSync(fileName)) {
    throw new Error(`definitions file '${fileName}' does not exist.`)
  }
  const file = await readFile(fileName, 'utf8')
  const parsed = JSON.parse(file)

  const schemaValidator: ValidateFunction<S3UploadDefinitionFile> = new Ajv({ allErrors: true }).compile(
    s3DefinitionSchema,
  )
  const valid = schemaValidator(parsed)

  if (valid) {
    return parsed
  }
  info('invalid definitions file:', schemaValidator.errors)
  throw new Error(`Definitions file does not match schema`)
}

async function clearBucket(
  s3Bucket: string,
  continuationToken: string | undefined,
  dryMode: boolean,
  log: Console['log'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
): Promise<Array<{ Key: string }>> {
  const listResponse = await client.send(
    new ListObjectsV2Command({
      Bucket: s3Bucket,
      ContinuationToken: continuationToken,
    }),
  )

  if (listResponse.Contents) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const deleteObjects = listResponse.Contents.map(({ Key }) => Key)
      .filter((key): key is string => !!key)
      .map((key) => ({ Key: key }))

    deleteObjects.forEach((o) => {
      log(colorize.red(`Delete Object: ${o.Key}`))
    })
    if (!dryMode) {
      await client.send(new DeleteObjectsCommand({ Bucket: s3Bucket, Delete: { Objects: deleteObjects } }))
    }

    if (listResponse.ContinuationToken) {
      const deletedObjects = await clearBucket(s3Bucket, listResponse.ContinuationToken, dryMode, log)
      return [...deleteObjects, ...deletedObjects]
    }

    return deleteObjects
  }
  return []
}

async function upload(
  s3Bucket: string,
  dir: string,
  definition: S3UploadDefinition,
  dryMode: boolean,
  log: Console['log'],
): Promise<any> {
  const filePart = definition.include.length === 1 ? definition.include[0] : `{${definition.include.join(',')}}`

  const pattern = `${dir}/{**/,}${filePart}`
  log(`glob pattern:`, pattern)
  const paths = await glob(pattern, { absolute: false })

  const requests = paths.map(async (path) => {
    const key = path.replace(dir, '').replace(/^\//, '')
    const contentType = definition.contentType || mime.getType(path)
    if (!contentType) {
      throw new Error(`could not get mime type of ${path}.`)
    }
    log(colorize.green(`upload ${path} as '${key}' (${contentType})`))
    if (!dryMode) {
      const body = await readFile(path)
      await client.send(
        new PutObjectCommand({
          Key: key,
          Bucket: s3Bucket,
          Body: body,
          ContentType: contentType,
          CacheControl: definition.cacheControl,
        }),
      )
    }
  })

  await Promise.all(requests)

  return paths
}
