import { LogLevel, LogTransport } from '@shiftcode/logger'
import { Container } from 'inversify'
import { beforeEach, describe, expect, test } from 'vitest'

import { MockLogTransport, MockLogTransportConfig } from '../../test/mock-log.transport.js'
import { bindLogTransport } from './log-transport-helper.js'

describe('bindLogTransport Helper Function', () => {
  let container: Container
  let transportConfig: MockLogTransportConfig
  let transportInstance: MockLogTransport

  beforeEach(() => {
    container = new Container()
    transportConfig = { logLevel: LogLevel.DEBUG, mockAttribute: 'test' }
    bindLogTransport(container, transportConfig, MockLogTransport)
    transportInstance = <MockLogTransport>container.get(LogTransport)
  })

  test('should bind and retrieve the transport instance correctly', () => {
    expect(transportInstance).toBeInstanceOf(MockLogTransport)
    expect(transportInstance['logLevel']).toBe(LogLevel.DEBUG)
  })

  test('should correctly call the transport instance log method', () => {
    const timestamp = new Date()
    const args = ['Test message']
    transportInstance.log(LogLevel.INFO, 'TestService', '#FF0000', timestamp, args)
    expect(transportInstance.logArgs).toEqual({
      level: LogLevel.INFO,
      clazzName: 'TestService',
      hexColor: '#FF0000',
      timestamp,
      args: ['Test message'],
    })
  })
})
