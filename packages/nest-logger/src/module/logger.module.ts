import { DynamicModule, Global, Module, Provider, Scope, Type } from '@nestjs/common'
import { INQUIRER } from '@nestjs/core'
import { Logger, LogTransport } from '@shiftcode/logger'

import { LoggerService } from '../services/logger.service.js'

export type TransportConfig<T extends Type<LogTransport>> = {
  transportClass: T
  config: ConstructorParameters<T>[0]
}

export type TransportConfigArray<T extends Array<Type<LogTransport>>> = {
  [K in keyof T]: TransportConfig<T[K]>
}

@Global()
@Module({
  providers: [
    LoggerService,
    {
      provide: Logger,
      scope: Scope.TRANSIENT,
      inject: [LoggerService, INQUIRER],
      useFactory: (loggerService: LoggerService, inquirer: string | object | undefined) => {
        const injectionPoint = typeof inquirer === 'string' ? inquirer : inquirer?.constructor?.name
        return loggerService.getInstance(injectionPoint ?? 'ROOT')
      },
    },
  ],
  exports: [LoggerService, Logger],
})
export class LoggerModule {
  static withTransports<T extends Array<Type<LogTransport>>>(transports: TransportConfigArray<T>): DynamicModule {
    const transportProviders: Provider[] = transports.map(({ transportClass, config }) => ({
      provide: transportClass,
      useFactory: () => new transportClass(config),
    }))

    return {
      module: LoggerModule,
      providers: [
        ...transportProviders,
        {
          provide: LogTransport,
          useFactory: (...instances: LogTransport[]) => instances,
          inject: transports.map(({ transportClass }) => transportClass),
        },
      ],
      exports: [LogTransport],
    }
  }
}
