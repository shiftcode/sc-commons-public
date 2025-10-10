import { LogTransport } from '../model/log-transport.js'
import { Logger } from '../model/logger.js'
import { stringToColor } from '../utils/logger-helper.js'

export class BaseLoggerService {
  private loggers = new Map<string, number>()

  constructor(private readonly logTransports: LogTransport[]) {}

  getInstance(name: string, hexColor?: string): Logger {
    hexColor = hexColor || stringToColor(name)

    if (this.loggers.has(name)) {
      const count = this.loggers.get(name) || 2
      this.loggers.set(name, count + 1)
      name += `_${count}`
    } else {
      this.loggers.set(name, 2)
    }

    return new Logger(name, hexColor, this.logTransports)
  }
}
