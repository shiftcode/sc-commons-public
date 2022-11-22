#!/usr/bin/env node
import fs from 'node:fs'
import { dirname, normalize as normalizePath } from 'node:path'
import process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const PCKG_JSON = 'package.json'
const PCKG_KEYS_TO_FIX = /^(main|module|typings|browser|es\d+)$/
const PCKG_BIN_KEY = 'bin'
const FILES_TO_CP = /(README|CHANGES|CHANGELOG|HISTORY|LICENSE|LICENCE|NOTICE')/i

interface Options {
  include: string[]
}

const argv = yargs(hideBin(process.argv)).option('include', {
  type: 'array',
  description: 'copy additional files into the dist folder',
  default: [],
}).argv

function log(...args: any[]) {
  console.log(`prepare-dist::`, ...(args || []).map((v) => (typeof v === 'string' ? v : JSON.stringify(v))))
}

/**
 * ensure returned value looks like dir/
 * @example:
 * ./dir => dir/
 * ./dir/ ==> dir/
 * dir/ => dir/
 * dir => dir/
 */
function ensureDir(val: string): string {
  return val
    .replace(/^.\//, '') // ensure no ./ at the beginning
    .replace(/([^/])$/, '$1/') // ensure slash at the end
}

export function prepareDist(opts: Options) {
  // read package json
  const packageFile = fs.readFileSync(`./${PCKG_JSON}`)
  const pckg = JSON.parse(<any>packageFile)

  const publishDir =
    pckg && pckg.publishConfig && pckg.publishConfig.directory ? ensureDir(pckg.publishConfig.directory) : 'dist/'

  const fixPath = (p: any) => p.replace(publishDir, '')

  log(`Package: ${pckg.name} | PublishDirectory: ${publishDir}`)
  // refactor package.json
  const publishPckg: any = Object.entries(pckg).reduce((u, [key, val]) => {
    if (PCKG_KEYS_TO_FIX.test(key)) {
      log(`rewrite ${key} path. from`, val)
      val =
        typeof val === 'string'
          ? fixPath(val)
          : (() => {
              throw new Error(`${PCKG_JSON}#${key} is not a string`)
            })()
      log('to:', val)
    }
    if (key === PCKG_BIN_KEY) {
      log('rewrite bin paths. from', val)
      val =
        typeof val === 'object' && val !== null
          ? Object.entries(val).reduce((_u, [_k, _v]) => ({ ..._u, [_k]: fixPath(_v) }), {})
          : (() => {
              throw new Error(`${PCKG_JSON}#${PCKG_BIN_KEY} is not an object`)
            })()
      log('to:', val)
    }
    return { ...u, [key]: val }
  }, {})

  delete publishPckg.scripts
  delete publishPckg.devDependencies
  delete publishPckg.publishConfig

  // copy package.json and necessary files into ./dist
  fs.writeFileSync(`./${publishDir}${PCKG_JSON}`, JSON.stringify(publishPckg, undefined, 2))

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

run()
