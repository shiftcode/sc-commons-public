import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'

import { ConsoleMock, mockConsole, restoreConsole } from '../../test/console-mock.function.js'
import { LogLevel } from '../model/log-level.enum.js'
import { stringToColor } from '../utils/logger-helper.js'
import { ConsoleJsonLogTransport } from './console-json-log.transport.js'

describe('uses console statement according to levels', () => {
  let logger: ConsoleJsonLogTransport
  let logArgs: any[]
  let timestamp: Date
  let consoleMock: ConsoleMock

  beforeEach(() => {
    consoleMock = mockConsole()
    logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.DEBUG })
    logArgs = ['foo bar']
    timestamp = new Date()
  })
  afterEach(restoreConsole)

  test('calls correct console level for DEBUG', () => {
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), timestamp, logArgs)
    expect(consoleMock.debug).toHaveBeenCalled()
    expect(consoleMock.debug).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'DEBUG',
        timestamp: timestamp.toISOString(),
        logger: 'MyClass',
        message: 'foo bar',
      }),
    )
  })
  test('calls correct console level for INFO', () => {
    logger.log(LogLevel.INFO, 'MyClass', stringToColor('MyClass'), timestamp, logArgs)
    expect(consoleMock.info).toHaveBeenCalled()
    expect(consoleMock.info).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'INFO',
        timestamp: timestamp.toISOString(),
        logger: 'MyClass',
        message: 'foo bar',
      }),
    )
  })
  test('calls correct console level for WARN', () => {
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), timestamp, logArgs)
    expect(consoleMock.warn).toHaveBeenCalled()
    expect(consoleMock.warn).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'WARN',
        timestamp: timestamp.toISOString(),
        logger: 'MyClass',
        message: 'foo bar',
      }),
    )
  })
  test('calls correct console level for ERROR', () => {
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), timestamp, logArgs)
    expect(consoleMock.error).toHaveBeenCalled()
    expect(consoleMock.error).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'ERROR',
        timestamp: timestamp.toISOString(),
        logger: 'MyClass',
        message: 'foo bar',
      }),
    )
  })
})

describe('respects the configured level', () => {
  let consoleMock: ConsoleMock

  beforeEach(() => {
    consoleMock = mockConsole()
  })
  afterEach(restoreConsole)

  test('respects level DEBUG', () => {
    const logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.DEBUG, belowLevelLogBufferSize: 0 })
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar debug'])
    logger.log(LogLevel.INFO, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar info'])
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar warn'])
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar error'])
    expect(consoleMock.debug).toHaveBeenCalledTimes(1)
    expect(consoleMock.info).toHaveBeenCalledTimes(1)
    expect(consoleMock.warn).toHaveBeenCalledTimes(1)
    expect(consoleMock.error).toHaveBeenCalledTimes(1)
  })
  test('respects level INFO', () => {
    const logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.INFO, belowLevelLogBufferSize: 0 })
    // do not log DEBUG to keep this focused on allowed levels only
    logger.log(LogLevel.INFO, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar info'])
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar warn'])
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar error'])
    expect(consoleMock.debug).toHaveBeenCalledTimes(0)
    expect(consoleMock.info).toHaveBeenCalledTimes(1)
    expect(consoleMock.warn).toHaveBeenCalledTimes(1)
    expect(consoleMock.error).toHaveBeenCalledTimes(1)
  })
  test('respects level WARN', () => {
    const logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.WARN, belowLevelLogBufferSize: 0 })
    // do not log DEBUG/INFO to keep this focused on allowed levels only
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar warn'])
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar error'])
    expect(consoleMock.debug).toHaveBeenCalledTimes(0)
    expect(consoleMock.info).toHaveBeenCalledTimes(0)
    expect(consoleMock.warn).toHaveBeenCalledTimes(1)
    expect(consoleMock.error).toHaveBeenCalledTimes(1)
  })
  test('respects level ERROR', () => {
    const logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.ERROR, belowLevelLogBufferSize: 0 })
    // only log ERROR as allowed
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar error'])
    expect(consoleMock.debug).toHaveBeenCalledTimes(0)
    expect(consoleMock.info).toHaveBeenCalledTimes(0)
    expect(consoleMock.warn).toHaveBeenCalledTimes(0)
    expect(consoleMock.error).toHaveBeenCalledTimes(1)
  })
})

describe('use first argument as message if string', () => {
  let logger: ConsoleJsonLogTransport
  let consoleMock: ConsoleMock
  let timestamp: Date

  beforeEach(() => {
    consoleMock = mockConsole()
    logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.DEBUG })
    timestamp = new Date()
  })
  afterEach(restoreConsole)

  test('if only 1 arg', () => {
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), timestamp, ['foo bar debug'])
    expect(consoleMock.debug).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'DEBUG',
        timestamp: timestamp.toISOString(),
        logger: 'MyClass',
        message: 'foo bar debug',
      }),
    )
  })
  test('if second arg is object, put it to data', () => {
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), timestamp, ['foo bar debug', { value: true }])
    expect(consoleMock.debug).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'DEBUG',
        timestamp: timestamp.toISOString(),
        logger: 'MyClass',
        message: 'foo bar debug',
        data: {
          value: true,
        },
      }),
    )
  })
  test('if several additional object args, put them to data', () => {
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), timestamp, [
      'foo bar debug',
      { first: true },
      { second: false },
    ])
    expect(consoleMock.debug).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'DEBUG',
        timestamp: timestamp.toISOString(),
        logger: 'MyClass',
        message: 'foo bar debug',
        data: [{ first: true }, { second: false }],
      }),
    )
  })

  test('if first is not a string, message property is undefined', () => {
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), timestamp, [{ name: 'foo bar' }])
    expect(consoleMock.debug).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'DEBUG',
        timestamp: timestamp.toISOString(),
        logger: 'MyClass',
        data: { name: 'foo bar' },
      }),
    )
  })
})

describe('handles circular references in log data', () => {
  let logger: ConsoleJsonLogTransport
  let consoleMock: ConsoleMock
  let timestamp: Date

  beforeEach(() => {
    consoleMock = mockConsole()
    logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.DEBUG })
    timestamp = new Date()
  })
  afterEach(restoreConsole)

  test('in single object argument', () => {
    const circularObj: any = { name: 'circular' }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    circularObj.self = circularObj

    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), timestamp, [circularObj])

    expect(consoleMock.debug).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'DEBUG',
        timestamp: timestamp.toISOString(),
        logger: 'MyClass',
        data: {
          name: 'circular',
          self: '<circular reference>',
        },
      }),
    )
  })

  test('in nested object argument', () => {
    const circularObj: any = { name: 'circular' }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    circularObj.nested = { inner: circularObj }

    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), timestamp, [circularObj])

    expect(consoleMock.debug).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'DEBUG',
        timestamp: timestamp.toISOString(),
        logger: 'MyClass',
        data: {
          name: 'circular',
          nested: {
            inner: '<circular reference>',
          },
        },
      }),
    )
  })
})

// New tests for buffering behavior driven by belowLevelLogBufferSize

describe('below-level buffering and flush on ERROR', () => {
  let logger: ConsoleJsonLogTransport
  let consoleMock: ConsoleMock

  beforeEach(() => void (consoleMock = mockConsole()))
  afterEach(restoreConsole)

  const parseCallArg = (arg: unknown) => JSON.parse(arg as string) as { level: string; message: string }

  test('buffers below-level DEBUG/WARN logs and flushes them before ERROR', () => {
    logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.ERROR, belowLevelLogBufferSize: 10 })

    const ts = new Date()
    const color = stringToColor('MyClass')

    logger.log(LogLevel.DEBUG, 'MyClass', color, ts, ['debug-1'])
    logger.log(LogLevel.WARN, 'MyClass', color, ts, ['warn-1'])

    // trigger flush
    logger.log(LogLevel.ERROR, 'MyClass', color, ts, ['error-1'])

    expect(consoleMock.debug).toHaveBeenCalledTimes(1)
    expect(consoleMock.warn).toHaveBeenCalledTimes(1)
    expect(consoleMock.error).toHaveBeenCalledTimes(1)

    // verify order: flushed entries were logged before the ERROR
    const debugOrder = consoleMock.debug.mock.invocationCallOrder[0]
    const warnOrder = consoleMock.warn.mock.invocationCallOrder[0]
    const errorOrder = consoleMock.error.mock.invocationCallOrder[0]
    expect(debugOrder).toBeLessThan(warnOrder)
    expect(warnOrder).toBeLessThan(errorOrder)

    // verify messages preserved
    const debugPayload = parseCallArg(consoleMock.debug.mock.calls[0][0])
    const warnPayload = parseCallArg(consoleMock.warn.mock.calls[0][0])
    const errorPayload = parseCallArg(consoleMock.error.mock.calls[0][0])

    expect(debugPayload).toEqual(expect.objectContaining({ level: 'DEBUG', message: 'debug-1' }))
    expect(warnPayload).toEqual(expect.objectContaining({ level: 'WARN', message: 'warn-1' }))
    expect(errorPayload).toEqual(expect.objectContaining({ level: 'ERROR', message: 'error-1' }))
  })

  test('respects buffer size: only keep the last N items', () => {
    logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.ERROR, belowLevelLogBufferSize: 2 })

    const ts = new Date()
    const color = stringToColor('MyClass')

    logger.log(LogLevel.DEBUG, 'MyClass', color, ts, ['a'])
    logger.log(LogLevel.DEBUG, 'MyClass', color, ts, ['b'])
    logger.log(LogLevel.DEBUG, 'MyClass', color, ts, ['c']) // should evict 'a'

    logger.log(LogLevel.ERROR, 'MyClass', color, ts, ['boom'])

    expect(consoleMock.debug).toHaveBeenCalledTimes(2)
    const flushedMessages = consoleMock.debug.mock.calls.map((c: any[]) => parseCallArg(c[0]).message)
    expect(flushedMessages).toEqual(['b', 'c'])
  })

  test('buffer size 0 disables buffering', () => {
    logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.ERROR, belowLevelLogBufferSize: 0 })

    const ts = new Date()
    const color = stringToColor('MyClass')

    logger.log(LogLevel.DEBUG, 'MyClass', color, ts, ['pre']) // not kept
    logger.log(LogLevel.ERROR, 'MyClass', color, ts, ['err'])

    expect(consoleMock.debug).not.toHaveBeenCalled()
    expect(consoleMock.error).toHaveBeenCalledTimes(1)
  })

  test('does not flush when ERROR is not enabled (log level OFF)', () => {
    logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.OFF, belowLevelLogBufferSize: 5 })

    const ts = new Date()

    logger.log(LogLevel.DEBUG, 'MyClass', '#000000', ts, ['pre'])
    logger.log(LogLevel.ERROR, 'MyClass', '#000000', ts, ['err']) // below-level, so no flush

    expect(consoleMock.debug).not.toHaveBeenCalled()
    expect(consoleMock.info).not.toHaveBeenCalled()
    expect(consoleMock.warn).not.toHaveBeenCalled()
    expect(consoleMock.error).not.toHaveBeenCalled()
  })

  test('clears buffer after flushing on ERROR', () => {
    logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.ERROR, belowLevelLogBufferSize: 5 })

    const ts = new Date()

    logger.log(LogLevel.DEBUG, 'MyClass', '#000000', ts, ['once'])
    logger.log(LogLevel.ERROR, 'MyClass', '#000000', ts, ['first']) // flushes 'once'
    logger.log(LogLevel.ERROR, 'MyClass', '#000000', ts, ['second']) // no additional debug flushed

    expect(consoleMock.debug).toHaveBeenCalledTimes(1)
    expect(consoleMock.error).toHaveBeenCalledTimes(2)
  })
})
