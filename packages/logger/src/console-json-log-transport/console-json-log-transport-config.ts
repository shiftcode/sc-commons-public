import { LogLevel } from '../model/log-level.enum.js'

export interface ConsoleJsonLogTransportConfig {
  logLevel: LogLevel
  jsonStringifyReplacer?: (key: string, value: any) => any
}
