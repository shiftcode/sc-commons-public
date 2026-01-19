import { InspectOptions } from 'node:util'

import { LogLevel } from '../../model/log-level.enum.js'

export interface NodeConsoleLogTransportConfig {
  logLevel: LogLevel
  nodeInspectOptions?: InspectOptions
}
