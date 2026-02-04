import { jest } from '@jest/globals'

const originalConsole = { ...console }

export interface ConsoleMock {
  debug: jest.Mock
  info: jest.Mock
  warn: jest.Mock
  error: jest.Mock
  log?: jest.Mock
}

export function mockConsole() {
  console.log = jest.fn()
  console.debug = jest.fn()
  console.info = jest.fn()
  console.warn = jest.fn()
  console.error = jest.fn()

  return <ConsoleMock>(<any>console)
}

export function restoreConsole() {
  console = originalConsole
}
