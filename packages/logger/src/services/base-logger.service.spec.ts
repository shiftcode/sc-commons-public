import { SpyLogTransport } from '../../test/spy-log.transport.js'
import { LogLevel } from '../model/log-level.enum.js'
import { Logger } from '../model/logger.js'
import { BaseLoggerService } from './base-logger.service.js'

describe('BaseLoggerService with SpyLogTransport', () => {
  it('should use the spy log transport', () => {
    const baseLoggerService = new BaseLoggerService([new SpyLogTransport(LogLevel.DEBUG)])
    const logger: Logger = baseLoggerService.getInstance('MyLogger', '#abcdef')
    expect(logger['loggerTransports'][0] instanceof SpyLogTransport).toBeTruthy()
    expect(logger['loggerTransports'][0]['logLevel']).toBe(LogLevel.DEBUG)
  })

  it('should have the custom name and color passed to the logger service', () => {
    const baseLoggerService = new BaseLoggerService([new SpyLogTransport(LogLevel.DEBUG)])
    const logger: Logger = baseLoggerService.getInstance('MyLogger', '#abcdef')
    expect(logger['name']).toBe('MyLogger')
    expect(logger['color']).toBe('#abcdef')
  })
})
