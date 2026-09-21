import { handlerToBundleInfo } from '@shiftcode/iac-utilities'
import { getEnumValues } from '@shiftcode/utilities'
import { build, BuildOptions } from 'esbuild'

import { LambdaFunctionName } from '../lib/lambda-function-name.enum.js'

function createConfig(handler: LambdaFunctionName): BuildOptions {
  const bundleInfo = handlerToBundleInfo(handler, './dist/lib', './dist/esbuild')

  return {
    platform: 'node',
    target: 'es2022',
    format: 'esm',
    // inline all dependencies
    bundle: true,
    entryPoints: [bundleInfo.entryPoint],
    outfile: `${bundleInfo.outPath}${bundleInfo.baseFilename}.mjs`,
    minify: false,
    treeShaking: true,
    banner: {
      /*
       * The banner content will be added to the beginning of the out file. This helps to prevent the following bug at
       * runtime:
       * > Dynamic require of "crypto" is not supported
       *
       * Since we are running in ESM context there is no "require" implement, but rather we want to use the
       * createRequire function provided by node:module to provide the require function.
       *
       * Note on alias: CreateRequire alias is here to prevent duplicate error if user-land implementation of
       * createRequire exists.
       */
      js: `import { createRequire as createRequire_aix6bKft } from 'node:module';const require = createRequire_aix6bKft(import.meta.url);`,
    },
  }
}

async function run() {
  const configurations = getEnumValues(LambdaFunctionName).map(createConfig)

  for (const config of configurations) {
    await build(config)

    console.log(`successfully built ${config.outfile}`)
  }
}

try {
  await run()

  console.log('Compiled all lambda functions')
} catch (err) {
  console.error(err)
  process.exit(1)
}
