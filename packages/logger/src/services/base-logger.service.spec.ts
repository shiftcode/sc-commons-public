import { pickProps } from '@shiftcode/utilities'
import { describe, expect, test } from 'vitest'

import { LogLevel } from '../model/log-level.enum.js'
import { Logger } from '../model/logger.js'
import { SpyLogTransport } from '../testing/spy-log.transport.js'
import { BaseLoggerService } from './base-logger.service.js'

describe('BaseLoggerService with SpyLogTransport', () => {
  test('picks the correct properties from the log transport config', () => {
    const logTransportConfig = { logLevel: LogLevel.DEBUG, extraProp: 'should be ignored' }
    const pickedConfig = pickProps(logTransportConfig, ['logLevel'])
    expect(pickedConfig).toEqual({ logLevel: LogLevel.DEBUG })
  })

  test('should use the spy log transport', () => {
    const baseLoggerService = new BaseLoggerService([new SpyLogTransport(LogLevel.DEBUG)])
    const logger: Logger = baseLoggerService.getInstance('MyLogger', '#abcdef')
    expect(logger['loggerTransports'][0] instanceof SpyLogTransport).toBeTruthy()
    expect(logger['loggerTransports'][0]['logLevel']).toBe(LogLevel.DEBUG)
  })

  test('should have the custom name and color passed to the logger service', () => {
    const baseLoggerService = new BaseLoggerService([new SpyLogTransport(LogLevel.DEBUG)])
    const logger: Logger = baseLoggerService.getInstance('MyLogger', '#abcdef')
    expect(logger['name']).toBe('MyLogger')
    expect(logger['color']).toBe('#abcdef')
  })
})
