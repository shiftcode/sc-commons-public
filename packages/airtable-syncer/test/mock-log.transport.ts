import { LogLevel, LogTransport } from '@shiftcode/logger'
import { injectable } from 'inversify'
import { vi } from 'vitest'

@injectable()
export class MockLogTransport extends LogTransport {
  log = vi.fn()
  constructor(logLevel: LogLevel) {
    super(logLevel)
  }
}
