#!/usr/bin/env node
import yargs from 'yargs'

import { fetchClientConfig } from './scripts/index.js'

const DEFAULT_OUTPUT_KEY = 'CFO_CLIENT_CONFIG_URL'

const args = yargs(process.argv)
  .option('outputs', {
    alias: 'o',
    type: 'string',
    description: `path to the outputs json file. needs to define ${DEFAULT_OUTPUT_KEY}`,
    demandOption: true,
  })
  .option('key', {
    type: 'string',
    description: `key to read in the outputs.json file containing the client-config url`,
    default: DEFAULT_OUTPUT_KEY,
  })
  .option('destination', {
    alias: 'd',
    type: 'string',
    description: 'relative target path',
    default: './',
  })
  .option('write', {
    type: 'boolean',
    description: 'write to file (default: true)',
    default: true,
  }).argv

try {
  const resolvedArgs = await args
  const responseMsg = await fetchClientConfig({
    outputs: resolvedArgs.outputs,
    key: resolvedArgs.key,
    destination: resolvedArgs.destination,
    noWrite: !resolvedArgs.write,
  })
  console.info(responseMsg)
} catch (err) {
  console.error(err)
  process.exit(1)
}
