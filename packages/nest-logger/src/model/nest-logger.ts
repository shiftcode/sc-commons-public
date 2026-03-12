import { LoggerService } from '@nestjs/common'
import { Logger } from '@shiftcode/logger'

/**
 * A custom logger implementation designed to integrate seamlessly with NestJS applications.
 * This logger implements the LoggerService interface required by NestApplication.
 */
export class NestLogger implements LoggerService {
  constructor(private readonly logger: Logger) {}

  error(message: any, trace?: string) {
    this.logger.error([message, trace])
  }

  warn(message: any) {
    this.logger.warn([message])
  }

  debug(message: any) {
    this.logger.debug([message])
  }

  verbose(message: any) {
    this.debug(message)
  }

  log(message: any) {
    this.logger.info([message])
  }
}
