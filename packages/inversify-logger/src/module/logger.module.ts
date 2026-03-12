import { ContainerModule } from 'inversify'

import { LoggerService } from '../services/logger.service.js'

export const loggerModule = new ContainerModule((options) => {
  options.bind(LoggerService).toSelf().inSingletonScope()
})
