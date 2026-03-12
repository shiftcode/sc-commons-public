import { describe, expect, test } from 'vitest'

import { BundleInfo } from './base-bundle-info.type.js'
import { handlerToBundleInfo } from './handler-to-bundle-info.function.js'

describe('handlerToBundleInfo', () => {
  test(`works with default './dist' `, () => {
    const expectedBundleInfo: BundleInfo = {
      baseFilename: 'my-fn',
      filename: 'my-fn.js',
      entryPoint: './dist/functions/my-fn.js',
      functionName: 'my-fn',
      handlerName: 'handler',
      outPath: './dist/webpack/functions/my-fn/',
    }
    expect(handlerToBundleInfo('functions/my-fn.handler')).toEqual(expectedBundleInfo)
  })
  test('works with custom src/dest paths', () => {
    const expectedBundleInfo: BundleInfo = {
      baseFilename: 'my-fn',
      filename: 'my-fn.js',
      entryPoint: './dist/_esm2019/functions/my-fn.js',
      functionName: 'my-fn',
      handlerName: 'handler',
      outPath: './dist/bundles/functions/my-fn/',
    }
    expect(handlerToBundleInfo('functions/my-fn.handler', './dist/_esm2019', './dist/bundles')).toEqual(
      expectedBundleInfo,
    )
  })
})
