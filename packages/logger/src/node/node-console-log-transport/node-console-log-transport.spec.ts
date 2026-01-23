import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'

import { ConsoleMock, mockConsole, restoreConsole } from '../../../test/console-mock.function.js'
import { LogLevel } from '../../model/log-level.enum.js'
import { stringToColor } from '../../utils/logger-helper.js'
import { NodeConsoleLogTransport } from './node-console-log.transport.js'

describe('uses console statement according to levels', () => {
  const logDate = Object.freeze(new Date('2020-07-04T12:34:56.789'))
  const formattedDate = '12:34:56.789'

  let logger: NodeConsoleLogTransport
  let logArgs: any[]
  let consoleMock: ConsoleMock
  const className = 'MyClass'
  const color = stringToColor(className)

  beforeEach(() => {
    consoleMock = mockConsole()
    logger = new NodeConsoleLogTransport({ logLevel: LogLevel.DEBUG })
    logArgs = ['foo bar']
  })
  afterEach(restoreConsole)

  test('calls correct console level for DEBUG', () => {
    logger.log(LogLevel.DEBUG, className, color, logDate, logArgs)
    expect(consoleMock.debug).toHaveBeenCalled()
    const loggedStr = <string>consoleMock.debug.mock.calls[0][0]
    expect(loggedStr.includes(className)).toBeTruthy()
    expect(loggedStr.includes(logArgs[0])).toBeTruthy()
    expect(loggedStr.includes(formattedDate)).toBeTruthy()
  })
  test('calls correct console level for INFO', () => {
    logger.log(LogLevel.INFO, className, color, logDate, logArgs)
    expect(consoleMock.info).toHaveBeenCalled()
    const loggedStr = <string>consoleMock.info.mock.calls[0][0]
    expect(loggedStr.includes(className)).toBeTruthy()
    expect(loggedStr.includes(logArgs[0])).toBeTruthy()
    expect(loggedStr.includes(formattedDate)).toBeTruthy()
  })
  test('calls correct console level for WARN', () => {
    logger.log(LogLevel.WARN, className, color, logDate, logArgs)
    expect(consoleMock.warn).toHaveBeenCalled()
    const loggedStr = <string>consoleMock.warn.mock.calls[0][0]
    expect(loggedStr.includes(className)).toBeTruthy()
    expect(loggedStr.includes(logArgs[0])).toBeTruthy()
    expect(loggedStr.includes(formattedDate)).toBeTruthy()
  })
  test('calls correct console level for ERROR', () => {
    logger.log(LogLevel.ERROR, className, color, logDate, logArgs)
    expect(consoleMock.error).toHaveBeenCalled()
    const loggedStr = <string>consoleMock.error.mock.calls[0][0]
    expect(loggedStr.includes(className)).toBeTruthy()
    expect(loggedStr.includes(logArgs[0])).toBeTruthy()
    expect(loggedStr.includes(formattedDate)).toBeTruthy()
  })
})

describe('respects the configured level', () => {
  let consoleMock: ConsoleMock

  beforeEach(() => {
    consoleMock = mockConsole()
  })
  afterEach(restoreConsole)

  test('respects level DEBUG', () => {
    const logger = new NodeConsoleLogTransport({ logLevel: LogLevel.DEBUG })
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
    const logger = new NodeConsoleLogTransport({ logLevel: LogLevel.INFO })
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
    const logger = new NodeConsoleLogTransport({ logLevel: LogLevel.WARN })
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
    const logger = new NodeConsoleLogTransport({ logLevel: LogLevel.ERROR })
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

describe('prints all the given arguments', () => {
  const className = 'MyClass'
  const logDate = new Date()
  const color = stringToColor(className)
  let logger: NodeConsoleLogTransport
  let consoleMock: ConsoleMock

  beforeEach(() => {
    consoleMock = mockConsole()
    logger = new NodeConsoleLogTransport({ logLevel: LogLevel.DEBUG })
  })
  afterEach(restoreConsole)

  test('logs Error as Error', () => {
    const error = new Error('fail')
    logger.log(LogLevel.ERROR, className, color, logDate, [error])
    const usedArgs = consoleMock.error.mock.calls[0]
    expect(typeof usedArgs[0]).toBe('string')
    expect(usedArgs[1]).toMatch(/^Error: fail\n(\s+at.*)\n/) // stack trace follows
  })

  test('stringifies objects', () => {
    const obj = { propA: true }
    logger.log(LogLevel.DEBUG, className, color, logDate, [obj])
    const usedArgs = consoleMock.debug.mock.calls[0]
    expect(typeof usedArgs[0]).toBe('string')
    expect(usedArgs[1]).toBe('{ propA: true }') // not json, but util.inspect style
  })
})
