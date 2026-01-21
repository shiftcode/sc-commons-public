import { jsonMapSetStringifyReplacer } from '@shiftcode/utilities'

import { LogLevel } from '../model/log-level.enum.js'
import { LogTransport } from '../model/log-transport.js'
import { createJsonLogObjectData } from '../utils/create-json-log-object-data.function.js'
import { getJsonStringifyReplacer } from '../utils/get-json-stringify-replacer.function.js'
import { ConsoleJsonLogTransportConfig } from './console-json-log-transport-config.js'

export class ConsoleJsonLogTransport extends LogTransport {
  private readonly jsonStringifyReplacer: (key: string, value: any) => any

  constructor(config: ConsoleJsonLogTransportConfig) {
    super(config.logLevel)
    this.jsonStringifyReplacer = config.jsonStringifyReplacer ?? jsonMapSetStringifyReplacer
  }

  log(level: LogLevel, clazzName: string, _hexColor: string, timestamp: Date, args: any[]) {
    if (this.isLevelEnabled(level)) {
      const logObject = createJsonLogObjectData(level, clazzName, timestamp, args)

      const toLog = [JSON.stringify(logObject, getJsonStringifyReplacer(this.jsonStringifyReplacer))]

      /* eslint-disable prefer-spread,no-console */
      switch (level) {
        case LogLevel.DEBUG:
          console.debug.apply<Console, any[], void>(console, toLog)
          break
        case LogLevel.ERROR:
          console.error.apply<Console, any[], void>(console, toLog)
          break
        case LogLevel.INFO:
          console.info.apply<Console, any[], void>(console, toLog)
          break
        case LogLevel.WARN:
          console.warn.apply<Console, any[], void>(console, toLog)
          break
        case LogLevel.OFF:
          break
        default:
          return level // exhaustive check
      }
      /* eslint-enable prefer-spread,no-console */
    }
  }
}
