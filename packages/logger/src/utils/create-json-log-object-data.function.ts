import { getEnumKeyFromNum } from '@shiftcode/utilities'

import { LogLevel } from '../model/log-level.enum.js'
import { ErrorAttributes, formatError } from './format-error.function.js'

// used to enforce the usage of the factory function without any runtime overhead
//  therefore not intended to be used in runtime code
declare const JSON_LOG_OBJECT_DATA_BRAND: unique symbol;


/**
 * make sure to use the {@link createJsonLogObjectData} util function to create an instance of this interface
 */
export interface JsonLogObjectData {
  [JSON_LOG_OBJECT_DATA_BRAND]: true;

  level: string
  logger: string
  timestamp: string /* ISO string */

  message?: string
  error?: ErrorAttributes

  data?: unknown
}

export function createJsonLogObjectData(level: LogLevel, clazzName: string, timestamp: Date, args: unknown[]): JsonLogObjectData {
  const logObjectData: Partial<JsonLogObjectData> = {
    level: getEnumKeyFromNum(LogLevel, level),
    timestamp: timestamp.toISOString(),
    logger: clazzName,
  }

  // if first arg is string, it's the message
  if (typeof args[0] === 'string') {
    logObjectData.message = args.shift() as string
  }

  // if any arg is Error, extract it (only first one)
  // --> if no specific message, use error message as log message
  const errIndex = args.findIndex((arg) => arg instanceof Error)
  if (errIndex !== -1) {
    logObjectData.error = formatError(args.splice(errIndex, 1)[0] as Error)
    if (!logObjectData.message) {
      logObjectData.message = logObjectData.error.message
    }
  }

  // remaining args go to data
  if (args.length) {
    logObjectData.data = args.length === 1 ? args[0] : args
  }

  return logObjectData as JsonLogObjectData
}
