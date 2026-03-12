#!/usr/bin/env node
import { credentialsInit } from './scripts/index.js'

// simply get the first provided arg
const profileArg = process.argv[2]

try {
  await credentialsInit(profileArg)
  // noop as the credential_process output is already written to stdout
} catch (err) {
  console.error(err)
  process.exit(1)
}
