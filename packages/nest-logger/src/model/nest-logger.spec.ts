import { Logger, LogLevel } from '@shiftcode/logger'
import { beforeEach, describe, expect, test } from 'vitest'

import { MockLogTransport } from '../../test/mock-log.transport.js'
import { NestLogger } from './nest-logger.js'

describe('NestLogger', () => {
  let transport: MockLogTransport
  let logger: Logger
  let nestLogger: NestLogger

  beforeEach(() => {
    transport = new MockLogTransport({ logLevel: LogLevel.DEBUG, mockAttribute: 'test' })
    logger = new Logger('TestLogger', '#ffffff', [transport])
    nestLogger = new NestLogger(logger)
  })

  test('error(message, trace, context) forwards args as flat array, not nested', () => {
    nestLogger.error('msg', 'trace', 'ctx')
    expect(transport.logArgs?.args).toEqual(['msg', 'trace', 'ctx'])
  })

  test('warn(message, context) forwards args as flat array', () => {
    nestLogger.warn('msg', 'ctx')
    expect(transport.logArgs?.args).toEqual(['msg', 'ctx'])
  })

  test('log(message, context) forwards args as flat array', () => {
    nestLogger.log('msg', 'ctx')
    expect(transport.logArgs?.args).toEqual(['msg', 'ctx'])
  })

  test('debug(message, context) forwards args as flat array', () => {
    nestLogger.debug('msg', 'ctx')
    expect(transport.logArgs?.args).toEqual(['msg', 'ctx'])
  })

  test('verbose(message, context) forwards args as flat array', () => {
    nestLogger.verbose('msg', 'ctx')
    expect(transport.logArgs?.args).toEqual(['msg', 'ctx'])
  })

  test('error with only a message forwards a single-element args array', () => {
    nestLogger.error('only message')
    expect(transport.logArgs?.args).toEqual(['only message'])
  })
})
