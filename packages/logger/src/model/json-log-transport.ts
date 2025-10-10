import { LogTransport } from './log-transport.js'
import { LogLevel } from './log-level.enum.js'
import { createJsonLogObjectData, JsonLogObjectData } from './json-log-object-data.js'

export abstract class JsonLogTransport extends LogTransport {
  protected constructor(logLevel: LogLevel) {
    super(logLevel)
  }

  log(level: LogLevel, clazzName: string, _hexColor: string, timestamp: Date, args: any[]) {
    if (this.isLevelEnabled(level)) {
      const logObject = createJsonLogObjectData(level, clazzName, timestamp, args)
      this.transportLog(level, logObject)
    }
  }

  abstract transportLog(level: LogLevel, logDataObject: JsonLogObjectData): void
}
