import { LogLevel } from '../model/log-level.enum.js'
import { LogTransport } from '../model/log-transport.js'
import { Logger } from '../model/logger.js'
import { BaseLoggerService } from '../services/base-logger.service.js'
import { ConsoleJsonLogTransport } from '../transports/console-json-log-transport/console-json-log.transport.js'
import { NodeConsoleLogTransport } from '../transports/node-console-log-transport/node-console-log.transport.js'

/**
 * Creates a simple {@link Logger} instance that logs to the console with the specified name and log level

 * @param name The name of the logger
 * @param logLevel decides the minimum log level to be logged
 * @param type decides whether to use {@link NodeConsoleLogTransport} or {@link ConsoleJsonLogTransport}
 */
export function createConsoleLogger(name: string, logLevel: LogLevel, type: 'node' | 'json'): Logger {
  let transport: LogTransport
  switch (type) {
    case 'node':
      transport = new NodeConsoleLogTransport({ logLevel })
      break
    case 'json':
      transport = new ConsoleJsonLogTransport({ logLevel })
      break
    default:
      transport = type
  }
  return new BaseLoggerService([transport]).getInstance(name)
}
