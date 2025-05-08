import { createJsonLogObjectData } from './json-log-object-data.js'
import { LogLevel } from './log-level.enum.js'

describe('createJsonLogObjectData', () => {
  it('should create a log object with a message', () => {
    const result = createJsonLogObjectData(LogLevel.INFO, 'MyClass', new Date('2023-01-01T00:00:00.000Z'), [
      'Test message',
    ])

    expect(result).toEqual({
      level: 'INFO',
      logger: 'MyClass',
      timestamp: '2023-01-01T00:00:00.000Z',
      message: 'Test message',
    })
  })

  it('should create a log object with an error', () => {
    const error = new Error('Test error')
    const result = createJsonLogObjectData(LogLevel.ERROR, 'MyClass', new Date('2023-01-01T00:00:00.000Z'), [error])

    expect(result).toEqual({
      level: 'ERROR',
      logger: 'MyClass',
      timestamp: '2023-01-01T00:00:00.000Z',
      message: 'Test error',
      errorName: 'Error',
      exception: error.stack,
    })
  })

  it('should handle additional data', () => {
    const result = createJsonLogObjectData(LogLevel.DEBUG, 'MyClass', new Date('2023-01-01T00:00:00.000Z'), [
      'Test message',
      { key: 'value' },
    ])

    expect(result).toEqual({
      level: 'DEBUG',
      logger: 'MyClass',
      timestamp: '2023-01-01T00:00:00.000Z',
      message: 'Test message',
      data: { key: 'value' },
    })
  })
})
