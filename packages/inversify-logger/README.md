# inversify-logger

> 🎯 Target runtime: es2023 ([Node >= 22](https://node.green/#ES2023))

This package provides [@shiftcode/logger](https://github.com/shiftcode/sc-commons/pkgs/npm/logger) support for InversifyJS,
allowing you to inject loggers with context-aware naming, and configure log transports using Inversify DI.

# 🚀 Features

- Auto-named logger instances per class
- Supports multiple transports
- Logger service injection for custom logger creation

# Usage

## 1. Set up your Inversify container

```typescript
import { Container } from 'inversify'
import { loggerModule, bindLogTransport } from '@shiftcode/inversify-logger'
import { NodeConsoleLogTransport, NodeConsoleLogTransportConfig } from '@shiftcode/log-transpports'
import { LogLevel, LogTransport } from '@shiftcode/logger'

const container = new Container()

const consoleLogTransportConfig: NodeConsoleLogTransportConfig = { logLevel: LogLevel.DEBUG }
// Bind transports (you can bind multiple)
container.bind<LogTransport>(LogTransport).toConstantValue(new NodeConsoleLogTransport(consoleLogTransportConfig))

//You can use the bindLogTransport helper
bindLogTransport(container, consoleLogTransportConfig, NodeConsoleLogTransport)

// Load logger module (auto-wires everything)
container.load(loggerModule)
```

## 2. Inject the logger

```typescript
import { injectable, inject } from 'inversify'
import { LoggerService } from '@shiftcode/inversify-logger'

@injectable()
class MyService {
  constructor(@inject(LoggerService) loggerService: LoggerService) {
    const logger = this.loggerService.getInstance('CustomService')
    logger.debug('Custom-named logger')
  }
}
```
