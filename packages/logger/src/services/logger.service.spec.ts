import { SpyLogTransport } from '../../test/spy-log.transport.js'
import { LoggerService } from './logger.service.js'
import { LogLevel } from '../model/log-level.enum.js'
import { Logger } from '../model/logger.js'

describe('LoggerService with SpyLogTransport', () => {
  it('should use the spy log transport', () => {
    const loggerService = new LoggerService([new SpyLogTransport(LogLevel.DEBUG)])
    const logger: Logger = loggerService.getInstance('MyLogger', '#abcdef')
    expect(logger['loggerTransports'][0] instanceof SpyLogTransport).toBeTruthy()
    expect(logger['loggerTransports'][0]['logLevel']).toBe(LogLevel.DEBUG)
  })

  it('should have the custom name and color passed to the logger service', () => {
    const loggerService = new LoggerService([new SpyLogTransport(LogLevel.DEBUG)])
    const logger: Logger = loggerService.getInstance('MyLogger', '#abcdef')
    expect(logger['name']).toBe('MyLogger')
    expect(logger['color']).toBe('#abcdef')
  })
})
