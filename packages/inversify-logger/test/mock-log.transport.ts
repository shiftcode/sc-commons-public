import { LogLevel, LogTransport } from '@shiftcode/logger'

export interface MockLogTransportConfig {
  logLevel: LogLevel
  mockAttribute: string
}

export class MockLogTransport extends LogTransport {
  logArgs: any

  constructor(config: MockLogTransportConfig) {
    super(config.logLevel)
  }

  log(level: LogLevel, clazzName: string, hexColor: string, timestamp: Date, args: any[]) {
    // Mock the log method to simply store arguments for testing
    this.logArgs = { level, clazzName, hexColor, timestamp, args }
  }
}
