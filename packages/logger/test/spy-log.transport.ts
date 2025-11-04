import { jest } from '@jest/globals'

import { LogLevel, LogTransport } from '../src/index.js'

export class SpyLogTransport extends LogTransport {
  private logMock = jest.fn()

  constructor(logLevel = LogLevel.INFO) {
    super(logLevel)
  }

  log(level: LogLevel, clazzName: string, hexColor: string, timestamp: Date, args: any[]) {
    if (this.isLevelEnabled(level)) {
      this.logMock(level, clazzName, hexColor, timestamp, args)
    }
  }

  get mock() {
    return this.logMock
  }

  get calls() {
    return this.logMock.mock.calls
  }
}
