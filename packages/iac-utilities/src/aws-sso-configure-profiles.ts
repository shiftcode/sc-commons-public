#!/usr/bin/env node
import yargs from 'yargs'

import { configureAwsProfiles, DEFAULT_PATH_TO_AWS_SSO_CONFIG } from './scripts/aws-sso-configure-profiles.function.js'

const args = yargs(process.argv)
  .option('config', {
    alias: 'c',
    type: 'string',
    description: `path to the config file (default .${DEFAULT_PATH_TO_AWS_SSO_CONFIG}) from which the profiles will be copied to ~.aws/config. The content must match the schema defined in @shiftcode/iac-utilities/aws-sso-config-schema.json`,
    demandOption: true,
  })
  .option('verbose', {
    type: 'boolean',
    default: false,
    description: 'Run with verbose logging',
  })
  .example(
    'aws-sso-configure-profiles -c ./aws-sso-config.json',
    'copies the aws sso profiles form the given configuration file to the default config location (~/.aws/config)',
  )
  .showHelpOnFail(true).argv

try {
  const responseMsg = await configureAwsProfiles(args)
  process.stdout.write(responseMsg)
} catch (err) {
  console.error(err)
  process.exit(1)
}
