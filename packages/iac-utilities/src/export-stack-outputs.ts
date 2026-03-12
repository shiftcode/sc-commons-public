#!/usr/bin/env node
import yargs from 'yargs'

import { exportStackOutputs } from './scripts/index.js'

const args = yargs(process.argv)
  .option('stackName', {
    alias: 'n',
    type: 'string',
    description: 'stackname from which the outputs should be fetched',
    demandOption: true,
  })
  .option('destination', {
    alias: 'd',
    type: 'string',
    description: 'relative target path',
    default: './',
  })
  .option('fileName', {
    alias: 'f',
    type: 'string',
    description: 'name for file to write (default [stackname].cf-outputs.json)',
  }).argv

try {
  const responseMsg = await exportStackOutputs(args)
  console.info(responseMsg)
} catch (err) {
  console.error(err)
  process.exit(1)
}
