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
   * enable this option, when your lambda function is configured with `loggingFormat='JSON'`
   * @hint when loggingFormat='JSON' is set, you should also configure `applicationLogLevelV2` with `TRACE` - otherwise you won't see all logging output.
   */
  logJsObject?: boolean
}
