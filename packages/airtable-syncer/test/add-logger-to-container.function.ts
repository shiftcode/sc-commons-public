import { bindLogTransport, loggerModule } from '@shiftcode/inversify-logger'
import { LogLevel } from '@shiftcode/logger'
import { Container } from 'inversify'

import { MockLogTransport } from './mock-log.transport.js'

export function bindLoggerToContainer(con: Container): Container {
  void bindLogTransport(con, LogLevel.DEBUG, MockLogTransport)
  void con.load(loggerModule)
  return con
}
