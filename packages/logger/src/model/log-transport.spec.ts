import { SpyLogTransport } from '../../test/spy-log.transport.js'
import { LogLevel } from '../index.js'
import { stringToColor } from '../utils/logger-helper.js'

describe('respects the configured level', () => {
  test('respects level DEBUG', () => {
    const logger = new SpyLogTransport(LogLevel.DEBUG)
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar debug'])
    logger.log(LogLevel.INFO, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar info'])
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar warn'])
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar error'])
    expect(logger.mock).toHaveBeenCalledTimes(4)
    expect(logger.calls[0][0]).toBe(LogLevel.DEBUG)
    expect(logger.calls[1][0]).toBe(LogLevel.INFO)
    expect(logger.calls[2][0]).toBe(LogLevel.WARN)
    expect(logger.calls[3][0]).toBe(LogLevel.ERROR)
  })
  test('respects level INFO', () => {
    const logger = new SpyLogTransport(LogLevel.INFO)
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar debug'])
    logger.log(LogLevel.INFO, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar info'])
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar warn'])
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar error'])
    expect(logger.mock).toHaveBeenCalledTimes(3)
    expect(logger.calls[0][0]).toBe(LogLevel.INFO)
    expect(logger.calls[1][0]).toBe(LogLevel.WARN)
    expect(logger.calls[2][0]).toBe(LogLevel.ERROR)
  })
  test('respects level WARN', () => {
    const logger = new SpyLogTransport(LogLevel.WARN)
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar debug'])
    logger.log(LogLevel.INFO, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar info'])
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar warn'])
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar error'])
    expect(logger.mock).toHaveBeenCalledTimes(2)
    expect(logger.calls[0][0]).toBe(LogLevel.WARN)
    expect(logger.calls[1][0]).toBe(LogLevel.ERROR)
  })
  test('respects level ERROR', () => {
    const logger = new SpyLogTransport(LogLevel.ERROR)
    logger.log(LogLevel.DEBUG, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar debug'])
    logger.log(LogLevel.INFO, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar info'])
    logger.log(LogLevel.WARN, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar warn'])
    logger.log(LogLevel.ERROR, 'MyClass', stringToColor('MyClass'), new Date(), ['foo bar error'])
    expect(logger.mock).toHaveBeenCalledTimes(1)
    expect(logger.calls[0][0]).toBe(LogLevel.ERROR)
  })
})
