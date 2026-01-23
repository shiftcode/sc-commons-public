import { LogLevel } from '../model/log-level.enum.js'

export interface ConsoleJsonLogTransportConfig {
  logLevel: LogLevel
  jsonStringifyReplacer?: (key: string, value: any) => any

  /**
   * Log messages below the configured level will be buffered up to this size
   * and flushed when a log event with level Error occurs.
   * set to 0 to disable this "below-level" buffering.
   * @default 50
   */
  belowLevelLogBufferSize?: number

  /**
   * when true, the log output will be a JS object instead of a JSON string. {@jsonStringifyReplacer} is still used.
   */
  logJsObject?: boolean
}
