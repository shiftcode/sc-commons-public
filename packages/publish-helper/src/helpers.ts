/* eslint-disable no-console */
import { execSync } from 'node:child_process'

/**
 * executes a command using child_process
 * defining 'inherit' as stdio, which prints to the console and ignores the output
 */
export function exec(command: string): void {
  console.log(`>>> ${command}`)
  execSync(command, { encoding: 'utf8', stdio: 'inherit' })
}

/**
 * executes a command using child_process and returns the output
 */
export function execReturn(command: string): string {
  console.log(`>>> ${command}`)
  return execSync(command, { encoding: 'utf8' }).trim()
}

/**
 * ensure returned value looks like dir/
 * @example:
 * ./dir => dir/
 * ./dir/ ==> dir/
 * dir/ => dir/
 * dir => dir/
 */
export function ensureDir(val: string): string {
  return val
    .replace(/^.\//, '') // ensure no ./ at the beginning
    .replace(/([^/])$/, '$1/') // ensure slash at the end
}

/**
 * Will change the paths of the relevant fields to match the structure of the published artifacts
 */
export const PCKG_JSON = 'package.json'
const PCKG_KEYS_TO_FIX = /^(main|module|typings|browser|es\d+)$/
const PCKG_EXPORTS_KEY = 'exports'
const PCKG_BIN_KEY = 'bin'
export function fixPackageJsonPaths(
  packageJson: Record<string, any>,
  publishDir: string,
  log: (value: string, args: any[]) => void,
): Record<string, any> {
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
