import util from 'node:util'

import { colorizeForConsole } from '@shiftcode/utilities'

import { LogLevel } from '../../model/log-level.enum.js'
import { LogTransport } from '../../model/log-transport.js'
import { NodeConsoleLogTransportConfig } from './node-console-log-transport-config.js'

export const logLevelEmoji: Record<LogLevel, string> = ['🐞', '💬', '💣', '🔥', '']

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3,
  hour12: false,
})

export class NodeConsoleLogTransport extends LogTransport {
  private readonly inspectOpts: util.InspectOptions

  constructor(config: NodeConsoleLogTransportConfig) {
    super(config.logLevel)
    this.inspectOpts = config.nodeInspectOptions ?? {}
  }

  log(level: LogLevel, clazzName: string, hexColor: string, timestamp: Date, args: any[]) {
    if (this.isLevelEnabled(level)) {
      const now = timeFormat.format(timestamp)
      // make sure to not alter the input args array
      if (typeof args[0] === 'string') {
        // if first arg is string, also colorize it
        args = [
          `${logLevelEmoji[level]} ${colorizeForConsole(`${now} - ${clazzName} :: ${args[0]}`, hexColor)}`,
          ...args.slice(1).map((a) => util.inspect(a, this.inspectOpts)),
        ]
      } else {
        args = [
          `${logLevelEmoji[level]} ${colorizeForConsole(`${now} - ${clazzName} ::`, hexColor)}`,
          ...args.map((a) => util.inspect(a, this.inspectOpts)),
        ]
      }

      /* eslint-disable prefer-spread,no-console */
      switch (level) {
        case LogLevel.DEBUG:
          console.debug.apply<Console, any[], void>(console, args)
          break
        case LogLevel.ERROR:
          console.error.apply<Console, any[], void>(console, args)
          break
        case LogLevel.INFO:
          console.info.apply<Console, any[], void>(console, args)
          break
        case LogLevel.WARN:
          console.warn.apply<Console, any[], void>(console, args)
          break
        case LogLevel.OFF:
          break
        default:
          return level // exhaustive check
      }
      /* eslint-enable prefer-spread,no-console */
    }
  }
}
