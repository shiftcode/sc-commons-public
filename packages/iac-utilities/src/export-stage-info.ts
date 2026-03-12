#!/usr/bin/env node
import yargs from 'yargs'

import { exportStageInfo } from './scripts/index.js'

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
    default: 'stage-info.json',
  })
  .option('stage', {
    alias: 's',
    type: 'string',
    description: 'create stage-info with provided stage',
  }).argv

try {
  const responseMsg = await exportStageInfo(args)
  console.info(responseMsg)
} catch (err) {
  console.error(err)
  process.exit(1)
}
