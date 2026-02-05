#!/usr/bin/env node

import yargs from 'yargs'

import { awsEnvVars, AwsEnvVarsOptions } from './scripts/index.js'

const args = yargs(process.argv).option('configFilePath' satisfies keyof AwsEnvVarsOptions, {
  alias: 'c',
  type: 'string',
  description: 'Relative path to the AWS accounts config file',
}).argv

try {
  const responseMsg = await awsEnvVars(args)
  console.info(responseMsg)
} catch (err) {
  console.error(err)
  process.exit(1)
}
