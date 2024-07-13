#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'node:fs'
import { dirname, normalize as normalizePath } from 'node:path'
import process from 'node:process'
import yargs from 'yargs'
// eslint-disable-next-line import/no-internal-modules
import { hideBin } from 'yargs/helpers'
import { ensureDir, fixPackageJsonPaths, PCKG_JSON } from './helpers.js'

const FILES_TO_CP = /(README|CHANGES|CHANGELOG|HISTORY|LICENSE|LICENCE|NOTICE')/i

interface Options {
  include: string[]
}

const argv = yargs(hideBin(process.argv)).option('include', {
  type: 'array',
  description: 'copy additional files into the dist folder',
  default: [],
  string: true
}).argv

function log(...args: any[]) {
  console.log(`prepare-dist::`, ...(args || []).map((v) => (typeof v === 'string' ? v : JSON.stringify(v))))
}

export function prepareDist(opts: Options) {
  // read package json
  const packageFile = fs.readFileSync(`./${PCKG_JSON}`)
  const pck = JSON.parse(<any>packageFile)

  const publishDir = ensureDir(pck?.publishConfig?.directory ?? 'dist/')

  const publishPck = fixPackageJsonPaths(pck, publishDir, log)
  log(`Package: ${pck.name} | PublishDirectory: ${publishDir}`)

  delete publishPck.scripts
  delete publishPck.devDependencies
  delete publishPck.publishConfig

  // copy package.json and necessary files into ./dist
  fs.writeFileSync(`./${publishDir}${PCKG_JSON}`, JSON.stringify(publishPck, undefined, 2))

  const filesInDir = fs.readdirSync('./')
  for (const f of filesInDir) {
    if (FILES_TO_CP.test(f)) {
      log(`copy ${f} to ./${publishDir}`)
      fs.copyFileSync(f, `./${publishDir}${f}`)
    }
  }

  for (const item of opts.include) {
    const srcFile = normalizePath(item)
    if (fs.existsSync(srcFile)) {
      const targetDirName = dirname(srcFile)
      if (targetDirName) {
        fs.mkdirSync(`./dist/${targetDirName}`)
      }
      log(`copy ${srcFile} to ./${publishDir}`)
      fs.copyFileSync(srcFile, `./${publishDir}${srcFile}`)
    }
  }
}

async function run() {
  log('START')
  try {
    const options: Options = await argv
    prepareDist(options)
    log('DONE')
  } catch (err) {
    log('FAIL')
    console.error(err)
    process.exit(1)
  }
}

void run()
