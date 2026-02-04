import { jsonMapSetStringifyReplacer } from '@shiftcode/utilities'

import { LogLevel } from '../model/log-level.enum.js'
import { LogTransport } from '../model/log-transport.js'
import { createJsonLogObjectData } from '../utils/create-json-log-object-data.function.js'
import { getJsonStringifyReplacer } from '../utils/get-json-stringify-replacer.function.js'
import { pushToRingBuffer } from '../utils/push-to-ring-buffer.function.js'
import { ConsoleJsonLogTransportConfig } from './console-json-log-transport-config.js'

interface BufferedLogMessage {
  level: LogLevel
  message: string
}

export class ConsoleJsonLogTransport extends LogTransport {
  private static readonly DEFAULT_BUFFER_SIZE = 50
  private readonly bufferSize: number

  /** Ring buffer for log events below the configured level, flushed on ERROR */
  private pendingBuffer: BufferedLogMessage[] = []

  private readonly logJsObject: boolean
  private readonly jsonStringifyReplacer: (key: string, value: any) => any

  constructor(config: ConsoleJsonLogTransportConfig) {
    super(config.logLevel)
    this.logJsObject = config.logJsObject ?? false
    this.bufferSize = config.belowLevelLogBufferSize ?? ConsoleJsonLogTransport.DEFAULT_BUFFER_SIZE
    this.jsonStringifyReplacer = config.jsonStringifyReplacer ?? jsonMapSetStringifyReplacer
  }

  log(level: LogLevel, clazzName: string, _hexColor: string, timestamp: Date, args: any[]) {
    if (level === LogLevel.OFF) {
      return
    }

    const logObject = createJsonLogObjectData(level, clazzName, timestamp, args)

    // we stringify at this point (instead of postpone it to when logging actually happens)
    //   to cut any potential references to objects that could potentially change until the log is actually written.
    const message = JSON.stringify(logObject, getJsonStringifyReplacer(this.jsonStringifyReplacer))

    if (!this.isLevelEnabled(level)) {
      pushToRingBuffer(this.pendingBuffer, { level, message }, this.bufferSize)
      return
    }

    // on error enabled: flush buffered events first, then clear buffer
    if (level === LogLevel.ERROR) {
      for (const bufferedEntry of this.pendingBuffer) {
        this.logToConsole(bufferedEntry.level, bufferedEntry.message)
      }
      this.pendingBuffer = []
    }

    // log current message
    this.logToConsole(level, message)
  }

  protected logToConsole(level: LogLevel, toLog: string) {
    if (this.logJsObject) {
      toLog = JSON.parse(toLog)
    }
    /* eslint-disable no-console */
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(toLog)
        break
      case LogLevel.ERROR:
        console.error(toLog)
        break
      case LogLevel.INFO:
        console.info(toLog)
        break
      case LogLevel.WARN:
        console.warn(toLog)
        break
      case LogLevel.OFF:
        break
      default:
        return level // exhaustive check
    }
    /* eslint-enable no-console */
  }
}
