import { SpyLogTransport } from '../../test/spy-log.transport.js'
import { Logger, LogLevel } from '../index.js'
import { stringToColor } from '../utils/logger-helper.js'

describe('Logger behavior', () => {
  let logger: Logger
  let spyTransport1: SpyLogTransport
  let spyTransport2: SpyLogTransport
  const className = 'TestLogger'
  const color = stringToColor(className)

  it('should send logs to all transports', () => {
    spyTransport1 = new SpyLogTransport(LogLevel.DEBUG)
    spyTransport2 = new SpyLogTransport(LogLevel.INFO)
    logger = new Logger(className, color, [spyTransport1, spyTransport2])
    logger.error(['foo bar'])
    expect(spyTransport1.calls.length).toBe(1)
    expect(spyTransport2.calls.length).toBe(1)
  })

  it('should respect log level', () => {
    spyTransport1 = new SpyLogTransport(LogLevel.DEBUG)
    spyTransport2 = new SpyLogTransport(LogLevel.INFO)
    logger = new Logger(className, color, [spyTransport1, spyTransport2])
    logger.debug(['foo bar'])
    expect(spyTransport1.calls[0][0]).toBe(LogLevel.DEBUG)
    expect(spyTransport2.calls.length).toBe(0)
  })
})
