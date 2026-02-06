import { describe, expect, test } from 'vitest'

import type { CloudFrontFunctionEvent } from './cloudfront-function-request.type.js'
import { createBasicAuthCfFn } from './create-basic-auth-cf-fn.function.js'

describe('createBasicAuthCfFn', () => {
  function setup(...parameters: Parameters<typeof createBasicAuthCfFn>) {
    const fnCode = createBasicAuthCfFn(...parameters)

    // Wrap the string so it returns the handler
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const getHandler = Function(`${fnCode}\n return handler;`)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return getHandler() as (event: CloudFrontFunctionEvent) => any
  }

  test('creates an executable function', () => {
    const handler = setup('user1', 'p@ssw0rD')
    expect(typeof handler).toBe('function')
  })

  test('allows access with correct credentials', () => {
    const handler = setup('user1', 'p@ssw0rD')
    const event: CloudFrontFunctionEvent = {
      version: '1.0',
      context: {} as any,
      viewer: { ip: '' },
      request: {
        method: 'GET',
        uri: '/',
        querystring: {},
        headers: {
          authorization: { value: 'Basic ' + Buffer.from('user1:p@ssw0rD').toString('base64') },
        },
        cookies: {},
      },
    }

    const result = handler(event)
    expect(result).toBe(event.request)
  })

  test('denies access with incorrect credentials', () => {
    const handler = setup('user1', 'p@ssw0rD')
    const event: CloudFrontFunctionEvent = {
      version: '1.0',
      context: {} as any,
      viewer: { ip: '' },
      request: {
        method: 'GET',
        uri: '/',
        querystring: {},
        headers: {
          authorization: { value: 'Basic ' + Buffer.from('user1:wrongpassword').toString('base64') },
        },
        cookies: {},
      },
    }

    const result = handler(event)
    expect(result).toEqual({
      statusCode: 401,
      statusDescription: 'Unauthorized',
      headers: { 'www-authenticate': { value: 'Basic' } },
    })
  })
})
