import { LogLevel } from '../model/log-level.enum.js'

export abstract class LogTransport {
  protected logLevel: LogLevel

  protected constructor(logLevel: LogLevel) {
    this.logLevel = logLevel
  }

  abstract log(level: LogLevel, clazzName: string, hexColor: string, timestamp: Date, args: any[]): void

  protected isLevelEnabled(level: LogLevel) {
    return level >= this.logLevel
  }
}
