import { InspectOptions } from 'node:util'

import { LogLevel } from '../../model/log-level.enum.js'

export interface NodeConsoleLogTransportConfig {
  logLevel: LogLevel

  /**
   * options for {@link util.inspect} when logging objects.
   * @default none (uses node.js defaults)
   */
  nodeInspectOptions?: InspectOptions
}
