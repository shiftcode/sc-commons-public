#!/usr/bin/env node
import { createStageInfo, getBranchInfo } from '@shiftcode/branch-utilities'
import yargs from 'yargs'

const args = yargs(process.argv)
  .option('pretty', {
    type: 'boolean',
    description: 'pretty print the json output',
    default: true,
  })
  .option('stage', {
    alias: 's',
    type: 'string',
    description: 'generate the stage-info with provided stage',
  }).argv

interface Options {
  pretty: boolean
  stage?: string
}

try {
  const options: Options = await args
  const originalConsoleLog = console.log
  console.log = () => {} // suppress unwanted logs from getBranchInfo
  const stageInfo = createStageInfo(options.stage ?? getBranchInfo(process.env).stage)
  console.log = originalConsoleLog
  console.info(JSON.stringify(stageInfo, undefined, options.pretty ? 2 : 0))
} catch (err) {
  console.error(err)
  process.exit(1)
}
