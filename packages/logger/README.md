# logger

> 🎯\
> Target runtime: [Node >=24](https://node.green/#ES2023)) and [modern Browser](https://caniuse.com/?search=es2023) + Firefox ESR\
> Target lib: es2022 + ES2023.Array

A simple logger to use with @shiftcode-only dependencies.
The LoggerService is standalone and can be configured to log messages to various transports.

## Basic Usage

```typescript
import { LogLevel, BaseLoggerService, ConsoleJsonLogTransport } from '@shiftcode/logger'

// Create a logger service with one or more transports
const loggerService = new BaseLoggerService([new ConsoleJsonLogTransport({ logLevel: LogLevel.DEBUG })])

// Get a logger instance with a name and optional color
const logger = loggerService.getInstance('MyLogger', '#abcdef')

// Use the logger
logger.debug('Debug message', { someData: 'value' })
logger.info('Info message')
logger.warn('Warning message')
logger.error('Error occurred', new Error('Something went wrong'))
```

## Intended Behavior

The Following is the intended behavior - but implementation is due to the Log Transports.
Not everything is applicable to every transport.

### Message Field

- If the first argument is a string, it becomes the `message` field
- If no string message is provided but an `Error` is passed, the error's message becomes the log message

### Error Handling

- Errors can be passed at any position in the arguments
- The first `Error` found is extracted and [formatted](./src/utils/format-error.function.ts) into the `error` field with:
  - `name`: Error class name
  - `location`: Code location extracted from stack trace
  - `message`: Error message
  - `stack`: Full stack trace
  - `cause`: Recursively formatted if present

### Data Handling

- **BigInt**: Automatically converted to string for JSON serialization
- **Circular References**: Detected and replaced with `<circular reference>` placeholder (see [`getJsonStringifyReplacer`](./src/utils/get-json-stringify-replacer.function.ts))
- **Map/Set**: Serialized using the default `jsonMapSetStringifyReplacer` (can be customized)
- Remaining arguments after message and error extraction are placed in the `data` field

### Message Buffering

Log messages below the configured level are buffered (default: 50 messages).
When an `ERROR` level log occurs, all buffered messages are flushed first, providing context for the error.

## Log Transports

### [ConsoleJsonLogTransport](./src/console-json-log-transport/console-json-log.transport.ts)

**Purpose**: Structured JSON logging optimized for AWS Lambda / cloud environments.

Outputs logs as JSON strings (or JS objects) that can be parsed by AWS CloudWatch and other log aggregation services.

```typescript
import { ConsoleJsonLogTransport, LogLevel } from '@shiftcode/logger'

const transport = new ConsoleJsonLogTransport({ logLevel: LogLevel.INFO })
```

See [`ConsoleJsonLogTransportConfig`](./src/console-json-log-transport/console-json-log-transport-config.ts) for all options.

**Output format**:

```json
{
  "level": "INFO",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "logger": "MyService",
  "message": "Processing request",
  "data": { "requestId": "abc123" }
}
```

### [NodeConsoleLogTransport](./src/node/node-console-log-transport/node-console-log.transport.ts)

**Purpose**: Human-readable colored console output for local Node.js development.

Uses colorized output with emojis for log levels and `util.inspect` for object formatting.

```typescript
import { NodeConsoleLogTransport, LogLevel } from '@shiftcode/logger/node'

const transport = new NodeConsoleLogTransport({ logLevel: LogLevel.DEBUG })
```

See [`NodeConsoleLogTransportConfig`](./src/node/node-console-log-transport/node-console-log-transport-config.ts) for all options.

**Output format**:

```
🐞 10:30:00.000 - MyService :: Debug message { requestId: 'abc123' }
ℹ️ 10:30:00.001 - MyService :: Info message
⚠️ 10:30:00.002 - MyService :: Warning message
🔥 10:30:00.003 - MyService :: Error occurred
```

## Simple Lambda Logger

For AWS Lambda functions, use the [`simpleLambdaLogger`](./src/node/simple-lambda-logger.function.ts) helper that automatically selects the appropriate transport:

- **AWS Lambda environment**: Uses `ConsoleJsonLogTransport` (JSON output)
- **Local development**: Uses `NodeConsoleLogTransport` (colored console output)

```typescript
import { simpleLambdaLogger } from '@shiftcode/logger/node'
import { LogLevel } from '@shiftcode/logger'

// Automatically detects environment and uses appropriate transport
const logger = simpleLambdaLogger('MyLambdaHandler', LogLevel.DEBUG)

export const handler = async (event: any) => {
  logger.info('Processing event', { eventType: event.type })

  try {
    // ... your logic
    logger.debug('Operation completed', { result: 'success' })
  } catch (error) {
    // Error is automatically formatted with stack trace
    logger.error('Failed to process event', error, { eventId: event.id })
    throw error
  }
}
```

## Utilities

### [createJsonLogObjectData](./src/utils/create-json-log-object-data.function.ts)

Creates a structured JSON log object from log arguments. This function handles the parsing and organization of log message, error, and additional data into a standardized format.

**Behavior**:

- First string argument becomes the `message` field
- First `Error` instance is extracted and formatted into the `error` field
- If no message is provided but an error exists, the error's message is used
- Remaining arguments are placed in the `data` field

### [formatError](./src/utils/format-error.function.ts)

Formats an Error object into a loggable structure with consistent attributes including name, location, message, stack trace, and recursively formatted cause chain.

### [pushToRingBuffer](./src/utils/push-to-ring-buffer.function.ts)

Pushes an item to a ring buffer array, automatically removing the oldest entry when the buffer exceeds the specified maximum size. Used for message buffering.

### [stringToColor](./src/utils/string-to-color.function.ts)

Generates a deterministic hex color code from a string. Useful for assigning consistent colors to logger instances based on their names.
