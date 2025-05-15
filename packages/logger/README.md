# logger

> 🎯 Target runtime: es2023 ([Node >= 20](https://node.green/#ES2023))

A simple logger to use with minimal dependencies. 
By default, the logger is standalone and can be easily configured to log 
messages to various transports.

# Usage

````typescript
import { Logger, LogLevel, LogTransport, BaseLoggerService } from '@shiftcode/logger'

// Create a transport for logging to the console with a specific log level
const transport = new LogTransport(
  LogLevel.DEBUG, // This controls the minimum log level
)

// BaseLoggerService is used to manage loggers and their transports
const baseLoggerService = new BaseLoggerService([transport])

// Create a logger instance with a specific name and color
const logger = baseLoggerService.getInstance('MyLogger', '#abcdef')

// Logging messages at different levels
logger.debug('This is a debug message')
logger.info('This is an info message')
logger.warn('This is a warning message')
logger.error('This is an error message')
````