# nest-logger

> 🎯 Target runtime: es2024 ([Node >= 24](https://node.green/#ES2024))

This package provides [@shiftcode/logger](https://github.com/shiftcode/sc-commons/pkgs/npm/logger) support for NestJS, allowing you to inject loggers with context-aware naming and configure log transports using the NestJS DI system.

# 🚀 Features

- Auto-named logger instances per class
- Supports multiple log transports
- Logger service injection for custom logger creation

# Usage

## 1. Set up the module

```typescript
import { Module } from '@nestjs/common'
import { LoggerModule } from '@shiftcode/nest-logger'
import { LogLevel, NodeConsoleLogTransport, NodeConsoleLogTransportConfig } from '@shiftcode/logger'

@Module({
  imports: [
    // Bind transports (you can bind multiple)
    LoggerModule.withTransports([
      {
        transportClass: NodeConsoleLogTransport,
        config: { logLevel: LogLevel.DEBUG },
      },
    ]),
  ],
})
export class AppModule {}
```

## 2. Inject the logger

**Option A: Directly inject the logger (auto-named)**

```typescript
import { Injectable, Inject } from '@nestjs/common'
import { Logger } from '@shiftcode/logger'

@Injectable()
class MyService {
  constructor(@Inject(Logger) private logger: Logger) {
    this.logger.info('Initialized!')
  }
}
```

**Option B: Inject the logger service for custom naming**

```typescript
import { Injectable, Inject } from '@nestjs/common'
import { LoggerService } from '@shiftcode/nest-logger'

@Injectable()
class MyService {
  constructor(@Inject(LoggerService) private loggerService: LoggerService) {
    const logger = this.loggerService.getInstance('CustomService')
    logger.debug('Custom-named logger')
  }
}
```

## NestLogger

**You can also pass a NestLogger to the NestApplication in a bootstrap function**

```typescript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggerService } from '@shiftcode/nest-logger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const loggerService = app.get(LoggerService)
  app.useLogger(loggerService.getInstanceNest('MyService'))
  await app.listen(3000)
}
```
