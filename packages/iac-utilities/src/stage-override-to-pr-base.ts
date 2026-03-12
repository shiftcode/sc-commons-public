#!/usr/bin/env node

import { stageOverrideToPrBase } from './scripts/index.js'

try {
  const responseMsg = stageOverrideToPrBase()
  console.info(responseMsg)
} catch (err) {
  console.error(err)
  process.exit(1)
}
