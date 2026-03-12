import { Logger, LogLevel } from '@shiftcode/logger'
import { Container, inject, injectable } from 'inversify'
import { beforeEach, describe, expect, test } from 'vitest'

import { MockLogTransport, MockLogTransportConfig } from '../../test/mock-log.transport.js'
import { loggerModule } from '../module/logger.module.js'
import { bindLogTransport } from '../utils/log-transport-helper.js'
import { LoggerService } from './logger.service.js'

@injectable()
class SimpleService {
  logger: Logger
  constructor(@inject(LoggerService) public loggerService: LoggerService) {
    this.logger = this.loggerService.getInstance('MyCustomService')
  }
}

describe('creates logger via logger service', () => {
  let container: Container

  beforeEach(() => {
    container = new Container()

    const mockLogTransportConfig: MockLogTransportConfig = { logLevel: LogLevel.DEBUG, mockAttribute: 'test' }
    bindLogTransport(container, mockLogTransportConfig, MockLogTransport)
    container.loadSync(loggerModule)

    container.bind(SimpleService).toSelf().inSingletonScope()
  })

  test('Logger should use MockLogTransport', () => {
    const logger = container.get(SimpleService).logger
    expect(logger['loggerTransports'][0] instanceof MockLogTransport).toBeTruthy()
  })

  test('logger instance requested from container has passed name', () => {
    const logger = container.get(SimpleService).logger
    expect(logger['name']).toBe('MyCustomService')
  })
})
