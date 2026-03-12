import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { readFromStackOutput } from './script-utils.js'

export interface FetchClientConfigOptions {
  outputs: string
  destination: string
  key: string
  noWrite?: boolean
}

export async function fetchClientConfig(options: FetchClientConfigOptions | Promise<FetchClientConfigOptions>) {
  const opts = await options
  const clientConfigUrl = await readFromStackOutput(opts.outputs, opts.key)

  const response = await fetch(clientConfigUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch client config from ${clientConfigUrl}: ${response.status} ${response.statusText}`)
  }

  const parsed = await response.json()
  const pretty = JSON.stringify(parsed, undefined, 2)

  if (!opts.noWrite) {
    const dirPath = path.join(process.cwd(), opts.destination)

    await mkdir(dirPath, { recursive: true })
    const filePath = path.join(dirPath, 'client-config')

    await writeFile(filePath, pretty, { encoding: 'utf8' })
  }

  return pretty
}
