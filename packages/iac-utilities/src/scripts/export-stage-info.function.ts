import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { createStageInfo, getBranchInfo, StageInfo } from '@shiftcode/branch-utilities'

export interface ExportStageInfoOptions {
  destination: string
  filename: string
  stage?: string
}

export async function exportStageInfo(options: ExportStageInfoOptions | Promise<ExportStageInfoOptions>) {
  const opts = await options

  if (!opts.filename.endsWith('.json')) {
    throw new Error('name has to end with `.json`')
  }

  let info: StageInfo
  if (opts.stage) {
    info = createStageInfo(opts.stage)
  } else {
    const { stage, isProd, isPr } = getBranchInfo(process.env)
    info = { stage, isProd, isPr }
  }

  const infoNice = JSON.stringify(info, undefined, 2)
  const destinationPath = path.join(process.cwd(), opts.destination)
  await mkdir(destinationPath, { recursive: true })
  const filePath = path.join(destinationPath, opts.filename)
  console.info(`writing file to ${filePath}`)
  await writeFile(filePath, infoNice, { encoding: 'utf8' })
  return infoNice
}
