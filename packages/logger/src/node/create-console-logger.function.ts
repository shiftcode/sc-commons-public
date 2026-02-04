import { ConsoleJsonLogTransport } from '../console-json-log-transport/console-json-log.transport.js'
import { ConsoleJsonLogTransportConfig } from '../console-json-log-transport/console-json-log-transport-config.js'
import { LogTransport } from '../model/log-transport.js'
import { Logger } from '../model/logger.js'
import { BaseLoggerService } from '../services/base-logger.service.js'
import { NodeConsoleLogTransport } from './node-console-log-transport/node-console-log.transport.js'
import { NodeConsoleLogTransportConfig } from './node-console-log-transport/node-console-log-transport-config.js'

type Config = {
  node: NodeConsoleLogTransportConfig
  json: ConsoleJsonLogTransportConfig
}
/**
 * Creates a simple {@link Logger} instance that logs to the console with the specified name and log level

 * @param name The name of the logger
 * @param logLevel decides the minimum log level to be logged
 * @param type decides whether to use {@link NodeConsoleLogTransport} or {@link ConsoleJsonLogTransport}
 * @param config optional configuration for the selected transport
 */
export function createConsoleLogger(name: string, config: Config, type: 'node' | 'json'): Logger {
  let transport: LogTransport
  switch (type) {
    case 'node':
      transport = new NodeConsoleLogTransport(config.node)
      break
    case 'json':
      transport = new ConsoleJsonLogTransport(config.json)
      break
    default:
      transport = type
  }
  return new BaseLoggerService([transport]).getInstance(name)
}
