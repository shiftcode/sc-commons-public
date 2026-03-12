import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

export const colorize = {
  important: (txt: string) => `\x1b[44m\x1b[36m${txt}\x1b[0m`,
  red: (txt: string) => `\x1b[31m${txt}\x1b[0m`,
  green: (txt: string) => `\x1b[32m${txt}\x1b[0m`,
}

function hasProp<T, K extends string>(object: T, property: K): object is T & Record<K, unknown> {
  return typeof object === 'object' && object !== null && property in object
}

export async function readFromStackOutput(fileName: string, variable: string): Promise<string> {
  if (!existsSync(fileName)) {
    throw new Error(`stack output json file '${fileName}' does not exist.`)
  }
  const file = await readFile(fileName, 'utf8')
  const parsed: unknown = JSON.parse(file)

  if (hasProp(parsed, variable) && typeof parsed[variable] === 'string') {
    return parsed[variable]
  }
  throw new Error(`invalid stack output json file '${fileName}': could not read '${variable}'`)
}
