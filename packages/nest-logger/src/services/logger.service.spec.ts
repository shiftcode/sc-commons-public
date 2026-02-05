/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Logger, LogLevel } from '@shiftcode/logger'
import { beforeEach, describe, expect, it } from 'vitest'

import { MockLogTransport } from '../../test/mock-log.transport.js'
import { LoggerModule } from '../module/logger.module.js'
import { LoggerService } from './logger.service.js'

@Injectable()
class CustomService {
  logger: Logger
  constructor(@Inject(LoggerService) public loggerService: LoggerService) {
    this.logger = this.loggerService.getInstance('MyCustomService')
  }
}

@Injectable()
class SimpleService {
  constructor(@Inject(Logger) public logger: Logger) {}
}

@Injectable()
class OtherSimpleService {
  constructor(@Inject(Logger) public logger: Logger) {}
}

describe('LoggerService with Mock Transport', () => {
  let testingModule: TestingModule

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        LoggerModule.withTransports([
          {
            transportClass: MockLogTransport,
            config: { logLevel: LogLevel.DEBUG, mockAttribute: 'test' },
          },
        ]),
      ],
      providers: [CustomService, SimpleService, OtherSimpleService],
    }).compile()
  })

  it('should use the mock log transport', () => {
    const createdLogger = testingModule.get(CustomService).logger

    expect(createdLogger['loggerTransports'][0]).toBeInstanceOf(MockLogTransport)
    // @ts-expect-error
    expect(createdLogger['loggerTransports'][0].logLevel).toBe(LogLevel.DEBUG)

    const injectedLogger = testingModule.get<SimpleService>(SimpleService).logger
    expect(injectedLogger['loggerTransports'][0]).toBeInstanceOf(MockLogTransport)
    // @ts-expect-error
    expect(injectedLogger['loggerTransports'][0].logLevel).toBe(LogLevel.DEBUG)
  })

  it('should have the custom name passed to the logger service', () => {
    const logger = testingModule.get<CustomService>(CustomService).logger
    expect(logger['name']).toBe('MyCustomService')
  })

  it('should have the name of the requesting service', () => {
    const logger = testingModule.get<SimpleService>(SimpleService).logger
    expect(logger['name']).toBe('SimpleService')
  })

  it('should use the same LoggerService instance across the application', () => {
    const loggerService1 = testingModule.get(LoggerService)
    const loggerService2 = testingModule.get(LoggerService)
    const loggerService3 = testingModule.get(CustomService).loggerService
    expect(loggerService1).toBe(loggerService2)
    expect(loggerService1).toBe(loggerService3)
    expect(loggerService2).toBe(loggerService3)
  })

  it('should create a new instance for every directly injected logger', () => {
    const logger = testingModule.get<OtherSimpleService>(OtherSimpleService).logger
    expect(logger['name']).toBe('OtherSimpleService')

    const logger2 = testingModule.get<SimpleService>(SimpleService).logger
    expect(logger !== logger2).toBeTruthy()
  })
})
