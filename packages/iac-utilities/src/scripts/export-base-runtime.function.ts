import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { buildTimeBaseRuntimeConfigProvider } from '../base/config/build-time-base-runtime-config-provider.fn.js'
import { BaseRuntimeConfig } from '../base/index.js'

interface ExportBaseRuntimeConfigOptions {
  destination: string
  filename: string
  stage?: string
  region?: string
}

export async function exportBaseRuntimeConfig(
  options: ExportBaseRuntimeConfigOptions | Promise<ExportBaseRuntimeConfigOptions>,
) {
  const opts = await options
  let config: BaseRuntimeConfig

  if (opts.stage && opts.region) {
    // make sure when stage and region is set, never call buildTimeBaseRuntimeConfigProvider (SM)
    config = createConfig(opts.stage, opts.region)
  } else if (opts.stage) {
    config = createConfig(opts.stage, buildTimeBaseRuntimeConfigProvider().region)
  } else {
    config = buildTimeBaseRuntimeConfigProvider()
  }

  if (!opts.filename.endsWith('.json')) {
    throw new Error('name has to end with `.json`')
  }

  const configNice = JSON.stringify(config, undefined, 2)

  const destinationPath = path.join(process.cwd(), opts.destination)

  await mkdir(destinationPath, { recursive: true })

  const filePath = path.join(destinationPath, opts.filename)
  console.info(`writing file to ${filePath}`)
  await writeFile(filePath, configNice, { encoding: 'utf8' })

  return configNice
}

function createConfig(stage: string, region: string): BaseRuntimeConfig {
  const isPr = stage.startsWith('pr')
  const isXx = stage.startsWith('xx')
  if (!isPr && !isXx) {
    throw new Error('The provided stage neither is xx nor pr.')
  }
  return {
    region,
    stage,
    productionFlag: false,
    pullRequestFlag: isPr,
  }
}
