#!/usr/bin/env node
import yargs from 'yargs'

import { exportBaseRuntimeConfig } from './scripts/index.js'

const args = yargs(process.argv)
  .option('destination', {
    alias: 'd',
    type: 'string',
    description: 'relative target path',
    default: './',
  })
  .option('filename', {
    alias: 'f',
    type: 'string',
    description: 'name for file to write',
    default: 'base-runtime-config.json',
  })
  .option('stage', {
    alias: 's',
    type: 'string',
    description: 'create base runtime with provided stage',
  })
  .option('region', {
    alias: 'r',
    type: 'string',
    description: 'create base runtime with provided region',
  }).argv

try {
  const responseMsg = await exportBaseRuntimeConfig(args)
  console.info(responseMsg)
} catch (err) {
  console.error(err)
  process.exit(1)
}
