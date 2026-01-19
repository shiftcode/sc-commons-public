import { expect } from '@jest/globals'

import { LogLevel } from '../model/log-level.enum.js'
import { createJsonLogObjectData } from './create-json-log-object-data.function.js'

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
    error.name = 'TestError'

    const result = createJsonLogObjectData(LogLevel.ERROR, 'MyClass', new Date('2023-01-01T00:00:00.000Z'), [error])

    expect(result).toEqual({
      level: 'ERROR',
      logger: 'MyClass',
      timestamp: '2023-01-01T00:00:00.000Z',
      message: 'Test error',
      error: {
        name: 'TestError',
        message: 'Test error',
        cause: undefined,
        location: expect.stringContaining('json-log-object-data.spec.ts'),
        stack: expect.stringContaining(error.name),
      },
    })
  })

  it('should create a log object with an message and an error', () => {
    const error = new Error('Test error')
    error.name = 'TestError'

    const result = createJsonLogObjectData(LogLevel.ERROR, 'MyClass', new Date('2023-01-01T00:00:00.000Z'), [
      'Something Failed',
      error,
    ])

    expect(result).toEqual({
      level: 'ERROR',
      logger: 'MyClass',
      timestamp: '2023-01-01T00:00:00.000Z',
      message: 'Something Failed',
      error: {
        name: 'TestError',
        message: 'Test error',
        cause: undefined,
        location: expect.stringContaining('json-log-object-data.spec.ts'),
        stack: expect.stringContaining(error.name),
      },
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
