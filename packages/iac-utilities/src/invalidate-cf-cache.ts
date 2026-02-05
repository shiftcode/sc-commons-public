#!/usr/bin/env node
import yargs from 'yargs'

import { invalidateCfCache } from './scripts/index.js'

const DEFAULT_OUTPUT_KEY = 'CFO_CLOUD_FRONT_DISTRIBUTION_ID'

const args = yargs(process.argv)
  .option('outputs', {
    alias: 'o',
    type: 'string',
    description: `path to the outputs json file. needs to define ${DEFAULT_OUTPUT_KEY}`,
    demandOption: true,
  })
  .option('key', {
    type: 'string',
    description: `key to read in the outputs.json file containing the cloudFront distribution ID`,
    default: DEFAULT_OUTPUT_KEY,
  })
  .option('wait', { type: 'boolean', default: false, description: 'wait until invalidation is done' })
  .option('items', {
    array: true,
    type: 'string',
    description: 'items to invalidate',
    default: ['/*'],
  }).argv

try {
  const responseMsg = await invalidateCfCache(args)
  console.info(responseMsg)
} catch (err) {
  console.error(err)
  process.exit(1)
}
