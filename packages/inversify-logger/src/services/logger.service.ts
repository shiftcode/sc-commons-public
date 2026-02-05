import { BaseLoggerService, Logger, LogTransport } from '@shiftcode/logger'
import { injectable, multiInject } from 'inversify'

@injectable()
export class LoggerService {
  private baseService: BaseLoggerService

  constructor(@multiInject(LogTransport) logTransports: LogTransport[]) {
    this.baseService = new BaseLoggerService(logTransports)
  }

  getInstance(name: string, hexColor?: string): Logger {
    return this.baseService.getInstance(name, hexColor)
  }
}
