import { getEnumKeyFromNum } from '@shiftcode/utilities'
import { LogLevel } from './log-level.enum.js'

export interface JsonLogObjectData {
  level: string
  logger: string
  timestamp: string /* ISO string */
  message?: string
  errorName?: string
  exception?: string
  data?: any[]
}

export function createJsonLogObjectData(
  level: LogLevel,
  clazzName: string,
  timestamp: Date,
  args: any[],
): JsonLogObjectData {
  const logObjectData: Partial<JsonLogObjectData> = {
    level: getEnumKeyFromNum(LogLevel, level),
    timestamp: timestamp.toISOString(),
    logger: clazzName,
  }

  const msgOrError = args.shift()
  if (typeof msgOrError === 'string') {
    logObjectData.message = msgOrError
  } else if (msgOrError instanceof Error) {
    logObjectData.message = msgOrError.message
    logObjectData.errorName = msgOrError.name
    logObjectData.exception = msgOrError.stack?.toString()
  } else {
    // first param is neither string nor error, put it back to args to pass it to data
    args = [msgOrError, ...args]
  }
  if (args.length) {
    logObjectData.data = args.length === 1 ? args[0] : args
  }

  return logObjectData as JsonLogObjectData
}
