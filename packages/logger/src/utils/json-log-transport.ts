import { LogLevel } from '../model/log-level.enum.js'
import { LogTransport } from '../model/log-transport.js'
import { createJsonLogObjectData, JsonLogObjectData } from './create-json-log-object-data.function.js'

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
