import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'

import { ConsoleMock, mockConsole, restoreConsole } from '../../../test/console-mock.function.js'
import { LogLevel } from '../../model/log-level.enum.js'
import { stringToColor } from '../../utils/logger-helper.js'
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
    const logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.DEBUG })
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
    const logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.INFO })
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar debug'])
    logger.log(LogLevel.INFO, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar info'])
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar warn'])
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar error'])
    expect(consoleMock.debug).toHaveBeenCalledTimes(0)
    expect(consoleMock.info).toHaveBeenCalledTimes(1)
    expect(consoleMock.warn).toHaveBeenCalledTimes(1)
    expect(consoleMock.error).toHaveBeenCalledTimes(1)
  })
  test('respects level WARN', () => {
    const logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.WARN })
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar debug'])
    logger.log(LogLevel.INFO, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar info'])
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar warn'])
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar error'])
    expect(consoleMock.debug).toHaveBeenCalledTimes(0)
    expect(consoleMock.info).toHaveBeenCalledTimes(0)
    expect(consoleMock.warn).toHaveBeenCalledTimes(1)
    expect(consoleMock.error).toHaveBeenCalledTimes(1)
  })
  test('respects level ERROR', () => {
    const logger = new ConsoleJsonLogTransport({ logLevel: LogLevel.ERROR })
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar debug'])
    logger.log(LogLevel.INFO, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar info'])
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar warn'])
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
