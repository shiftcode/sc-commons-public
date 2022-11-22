#!/usr/bin/env node
import fs from 'node:fs'
import { dirname, normalize as normalizePath } from 'node:path'
import process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const PCKG_JSON = 'package.json'
const PCKG_KEYS_TO_FIX = /^(main|module|typings|browser|es\d+)$/
const PCKG_EXPORTS_KEY = 'exports'
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
  const pck = JSON.parse(<any>packageFile)

  const publishDir = ensureDir(pck?.publishConfig?.directory ?? 'dist/')

  const publishPck = fixPackageJsonPaths(pck, publishDir)
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

/**
 * Will change the paths of the relevant fields to match the structure of the published artifacts
 */
export function fixPackageJsonPaths(packageJson: Record<string, any>, publishDir: string): Record<string, any> {
  const fixPath = (p: any) => p.replace(publishDir, '')

  // refactor package.json
  return Object.entries(packageJson).reduce((u, [key, val]) => {
    if (PCKG_KEYS_TO_FIX.test(key)) {
      /*
       * simple key:value (e.g. module:"./dist/index.js"
       */
      log(`rewrite ${key} path. from`, val)
      val =
        typeof val === 'string'
          ? fixPath(val)
          : (() => {
              throw new Error(`${PCKG_JSON}#${key} is not a string`)
            })()
      log('to:', val)
    } else if (key === PCKG_EXPORTS_KEY) {
      /*
       * exports: {
       *  ".": "./index.js"
       * }
       */
      log('rewrite exports paths. from', val)
      if (typeof val === 'object' && Object.keys(val as Record<any, any>).length) {
        console.log('val === object', val)
        val = Object.entries(val).reduce((obj, [moduleName, exportPathOrObj]) => {
          if (exportPathOrObj && typeof exportPathOrObj === 'string') {
            /*
             * something like:
             * exports: {
             *  ".": "./index.js",
             *  ...potentially others
             * }
             */
            obj[moduleName] = fixPath(exportPathOrObj)
          } else if (exportPathOrObj && typeof exportPathOrObj === 'object') {
            /*
             * something like:
             * exports: {
             *  ".": {
             *    "types: "./index.d.ts",
             *    "default: "./index.js",
             *  },
             *  ...potentially others
             * }
             */
            obj[moduleName] = Object.entries(exportPathOrObj).reduce((o, [k2, v]) => {
              o[k2] = fixPath(v)
              return o
            }, {} as Record<string, string>)
          }
          return obj
        }, {} as Record<string, string | { types?: string; default?: string; required?: string }>)
      } else {
        throw new Error(`structure of field exports (${JSON.stringify(val)}) is not support by prepare-dist script`)
      }
    } else if (key === PCKG_BIN_KEY) {
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
