import { ConsoleJsonLogTransport } from '../console-json-log-transport/console-json-log.transport.js'
import { LogLevel } from '../model/log-level.enum.js'
import { Logger } from '../model/logger.js'
import { createConsoleLogger } from './create-console-logger.function.js'
import { NodeConsoleLogTransport } from './node-console-log-transport/node-console-log.transport.js'

describe('createConsoleLogger', () => {
  it('should create logger with NodeConsoleLogTransport when type is "node"', () => {
    const logger: Logger = createConsoleLogger('test-logger', LogLevel.INFO, 'node')

    expect(logger).toBeDefined()
    expect(logger['loggerTransports']).toHaveLength(1)
    expect(logger['loggerTransports'][0]).toBeInstanceOf(NodeConsoleLogTransport)
    expect(logger['loggerTransports'][0]['logLevel']).toBe(LogLevel.INFO)
  })

  it('should create logger with ConsoleJsonLogTransport when type is "json"', () => {
    const logger: Logger = createConsoleLogger('test-logger', LogLevel.DEBUG, 'json')

    expect(logger).toBeDefined()
    expect(logger['loggerTransports']).toHaveLength(1)
    expect(logger['loggerTransports'][0]).toBeInstanceOf(ConsoleJsonLogTransport)
    expect(logger['loggerTransports'][0]['logLevel']).toBe(LogLevel.DEBUG)
  })
})
