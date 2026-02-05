import path from 'node:path'

import { BundleInfo } from './base-bundle-info.type.js'

/**
 * creates bundle info for given lambdaFunctionName
 * @param handler the lambda function name
 * @param sourceDir path to the lambda functions src dir, default `./dist`
 * @param destDir path to the outDir, default `{sourceDir}/webpack/`
 * @example
 * handlerToBundleInfo('functions/my-fn.handler') -> {
 *     baseFilename: 'my-fn',
 *     filename: 'my-fn.js',
 *     entryPoint: './dist/functions/my-fn.js',
 *     functionName: 'my-fn',
 *     handlerName: 'handler',
 *     outPath: './dist/webpack/functions/my-fn/',
 *   }
 */
export function handlerToBundleInfo(handler: string, sourceDir = './dist', destDir?: string): BundleInfo {
  destDir = destDir ? destDir : `${sourceDir}/webpack`

  const baseNameParts = path.basename(handler).split('.')
  // return function handler name --> eg 'handler'
  // filename can contain '.'
  const handlerName = baseNameParts.splice(-1)[0]
  const baseFilename = baseNameParts.join('.')
  const functionName = baseNameParts.join('-')
  const dirname = path.dirname(handler)
  // abc-fn.handler --> abc-fn.js
  const filename = `${baseFilename}.js`
  return {
    entryPoint: `${sourceDir}/${dirname}/${filename}`,
    outPath: `${destDir}/${dirname}/${baseFilename}/`,
    baseFilename,
    filename,
    handlerName,
    functionName,
  }
}
