#!/usr/bin/env node
/* eslint-disable no-console */
import yargs from 'yargs'
import { stageOverrideToPrBase } from './scripts/index.js'

const args = yargs(process.argv)
  .option('branchNameOverride', {
    alias: 'b',
    type: 'string',
    description: 'branch name override to be used as PR base',
  }).argv

try {
  const responseMsg = await stageOverrideToPrBase(args)
  console.info(responseMsg)
}catch (err){
  console.error(err)
  process.exit(1)
}