#!/usr/bin/env node
import yargs from 'yargs'

import { S3_UPLOAD_DEFINITION_SCHEMA_NAME, uploadToS3 } from './scripts/index.js'

const DEFAULT_OUTPUT_KEY = 'CFO_S3_BUCKET_CLIENT'

const args = yargs(process.argv)
  .option('dir', {
    type: 'string',
    description: 'source dir to sync',
    default: './dist',
    demandOption: true,
  })
  .option('definitions', {
    alias: 'd',
    type: 'string',
    description: `the upload definitions json file (one with $schema ${S3_UPLOAD_DEFINITION_SCHEMA_NAME}`,
    demandOption: true,
  })
  .option('outputs', {
    alias: 'o',
    type: 'string',
    description: `path to the outputs json file. Needs to contain the property defined with the key option (defaults to ${DEFAULT_OUTPUT_KEY})`,
    demandOption: true,
  })
  .option('key', {
    type: 'string',
    description: `key to read in the outputs.json file containing the bucket name`,
    default: DEFAULT_OUTPUT_KEY,
  })
  .option('prune', {
    type: 'boolean',
    default: true,
    description:
      'By default, the bucket will be cleared before uploading files. Set this option to false to disable this behavior',
  })
  .option('dry', {
    type: 'boolean',
    default: false,
    description: 'do not delete or upload objects (in dry mode verbose is activated)',
  })
  .option('verbose', {
    type: 'boolean',
    default: false,
    description: 'Run with verbose logging',
  })
  .example(
    'upload-to-s3 ./dist -d ./s3-upload-definitions.json -o my-stack-outputs.json',
    'upload ./dist folder with given config',
  )
  .showHelpOnFail(true).argv

try {
  const responseMsg = await uploadToS3(args)
  console.info(responseMsg)
} catch (err) {
  console.error(err)
  process.exit(1)
}
