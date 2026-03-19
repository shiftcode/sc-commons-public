import { LoggerService } from '@nestjs/common'
import { Logger } from '@shiftcode/logger'

/**
 * A custom logger implementation designed to integrate seamlessly with NestJS applications.
 * This logger implements the LoggerService interface required by NestApplication.
 */
export class NestLogger implements LoggerService {
  constructor(private readonly logger: Logger) {}

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, optionalParams)
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, optionalParams)
  }

  debug(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, optionalParams)
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.debug(message, optionalParams)
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, optionalParams)
  }
}
