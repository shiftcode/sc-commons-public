import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { CloudFormationClient, DescribeStacksCommand } from '@aws-sdk/client-cloudformation'
import snakeCase from 'just-snake-case'

export interface ExportStackOutputsOptions {
  stackName: string
  destination: string
  fileName?: string
}

export async function exportStackOutputs(
  options: ExportStackOutputsOptions | Promise<ExportStackOutputsOptions>,
): Promise<string> {
  const opts = await options
  const cfn = new CloudFormationClient({})
  const stacks = await cfn.send(new DescribeStacksCommand({ StackName: opts.stackName }))
  if (!stacks.Stacks) {
    throw new Error(`no stack found with name ${opts.stackName}`)
  }
  const outputs = stacks.Stacks?.[0].Outputs

  if (!outputs) {
    throw new Error('no stack outputs found')
  }

  const dirPath = path.join(process.cwd(), opts.destination)

  await mkdir(dirPath, { recursive: true })

  const filePath = path.join(dirPath, opts.fileName || `${opts.stackName}.cf-outputs.json`)

  await writeFile(filePath, createJson(outputs), { encoding: 'utf8' })

  // await Promise.all([
  //   writeFile(`./${productName}.cf-outputs.sh`, createSh(outputs), { encoding: 'utf8' }),
  // ])

  return 'DONE'
}

// copy-pasted since not exported
/* eslint-disable @typescript-eslint/naming-convention */
interface Output {
  OutputKey?: string
  OutputValue?: string
  Description?: string
  ExportName?: string
}
/* eslint-enable @typescript-eslint/naming-convention */

export function createJson(outputs: Output[]): string {
  const obj = outputs.reduce<Record<string, string | null>>(
    (u, output) => ({
      ...u,
      [`CFO_${snakeCase(<string>output.OutputKey).toUpperCase()}`]: output.OutputValue ?? null,
    }),
    {},
  )

  return JSON.stringify(obj, undefined, 2)
}
