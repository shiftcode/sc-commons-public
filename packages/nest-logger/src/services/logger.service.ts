import { Inject, Injectable } from '@nestjs/common'
import { BaseLoggerService, Logger, LogTransport } from '@shiftcode/logger'

import { NestLogger } from '../model/nest-logger.js'

@Injectable()
export class LoggerService {
  private baseService: BaseLoggerService

  constructor(@Inject(LogTransport) private logTransports: LogTransport[]) {
    this.baseService = new BaseLoggerService(logTransports)
  }

  getInstance(name: string, hexColor?: string): Logger {
    return this.baseService.getInstance(name, hexColor)
  }

  getInstanceNest(name: string, hexColor?: string): NestLogger {
    return new NestLogger(this.baseService.getInstance(name, hexColor))
  }
}
