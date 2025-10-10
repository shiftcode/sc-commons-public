import { LogLevel } from './log-level.enum.js'
import { LogTransport } from './log-transport.js'

export class Logger {
  constructor(
    private name: string,
    private color: string,
    private loggerTransports: LogTransport[],
  ) {}

  info(...args: any[]) {
    this.log(LogLevel.INFO, args)
  }

  warn(...args: any[]) {
    this.log(LogLevel.WARN, args)
  }

  error(...args: any[]) {
    this.log(LogLevel.ERROR, args)
  }

  debug(...args: any[]) {
    this.log(LogLevel.DEBUG, args)
  }

  private log = (logLevel: LogLevel, args: any[]): void => {
    const now = new Date()
    this.loggerTransports.forEach((loggerTransport) => {
      loggerTransport.log(logLevel, this.name, this.color, now, args.slice())
    })
  }
}
