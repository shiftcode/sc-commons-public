import { describe, expect, test } from 'vitest'

import type { CloudFrontFunctionEvent } from './cloudfront-function-request.type.js'
import { createLanguageRedirectCfFn } from './create-language-redirect-cf.fn.js'

function createCfFunctionEvent(
  url: string,
  headers: CloudFrontFunctionEvent['request']['headers'] = {},
): CloudFrontFunctionEvent {
  // split the url into host and path
  const urlParts = url.split('/')
  const host = urlParts[0]
  const uri = '/' + urlParts.slice(1).join('/')

  // add host header
  headers.host = { value: host }

  return {
    version: '1.0',
    context: {} as any,
    viewer: { ip: '' },
    request: {
      method: 'GET',
      uri,
      querystring: {},
      headers,
      cookies: {},
    },
  }
}

describe('createLanguageRedirectCfFn', () => {
  function setup(...parameters: Parameters<typeof createLanguageRedirectCfFn>) {
    const fnCode = createLanguageRedirectCfFn(...parameters)

    // Wrap the string so it returns the handler
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const getHandler = Function(`${fnCode}\n return handler;`)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return getHandler() as (event: CloudFrontFunctionEvent) => any
  }

  test('creates an executable function', () => {
    const handler = setup(['en', 'de'], 'en')
    expect(typeof handler).toBe('function')
  })

  test('does not contain a "debugger" statement', () => {
    // cuz that's the only way to debug it, and we really don't want that in prod
    const fnCode = createLanguageRedirectCfFn(['en', 'de'], 'en')
    expect(fnCode).not.toMatch(/debugger;?/)
  })

  test('returns the request when already on a language path', () => {
    const handler = setup(['en', 'de', 'fr'], 'en')
    const event = createCfFunctionEvent('shiftcode.io/de/some/path')
    const result = handler(event)
    expect(result).toBe(event.request)
  })

  test('does not accept language paths not in the list but behaves like it is an ordinary path part', () => {
    const handler = setup(['en', 'de', 'fr'], 'en')
    const event = createCfFunctionEvent('shiftcode.io/it/some/path')
    const result = handler(event)
    expect(result).not.toBe(event.request)
    expect(result).toEqual({
      statusCode: 302,
      statusDescription: 'Found',
      headers: expect.objectContaining({
        location: { value: 'https://shiftcode.io/en/it/some/path' },
      }),
    })
  })

  test('redirects to fallback language when no cookie or header present', () => {
    const handler = setup(['en', 'de', 'fr'], 'en')
    const event = createCfFunctionEvent('shiftcode.io')
    const result = handler(event)
    expect(result).toEqual({
      statusCode: 302,
      statusDescription: 'Found',
      headers: expect.objectContaining({
        location: { value: 'https://shiftcode.io/en' },
      }),
    })
  })

  test('keeps the path when redirecting to fallback language', () => {
    const handler = setup(['en', 'de', 'fr'], 'en')
    const event = createCfFunctionEvent('shiftcode.io/some/path')
    const result = handler(event)
    expect(result).toEqual({
      statusCode: 302,
      statusDescription: 'Found',
      headers: expect.objectContaining({
        location: { value: 'https://shiftcode.io/en/some/path' },
      }),
    })
  })

  test('redirects by accept-language header', () => {
    const handler = setup(['en', 'de', 'fr'], 'en', 'LANGUAGE')
    const event = createCfFunctionEvent('shiftcode.io', { 'accept-language': { value: 'fr, de;q=0.8, en;q=0.6' } })
    const result = handler(event)
    expect(result).toEqual({
      statusCode: 302,
      statusDescription: 'Found',
      headers: expect.objectContaining({
        location: { value: 'https://shiftcode.io/fr' },
      }),
    })
  })

  test('redirects by custom language cookie', () => {
    const handler = setup(['en', 'de', 'fr'], 'en', 'LANGUAGE')
    const event = createCfFunctionEvent('shiftcode.io', { cookie: { value: 'en=fr;LANGUAGE=de' } })
    const result = handler(event)
    expect(result).toEqual({
      statusCode: 302,
      statusDescription: 'Found',
      headers: expect.objectContaining({
        location: { value: 'https://shiftcode.io/de' },
      }),
    })
  })

  test('prefers cookie over accept-language header', () => {
    const handler = setup(['en', 'de', 'fr'], 'en', 'LANGUAGE')
    const event = createCfFunctionEvent('shiftcode.io', {
      cookie: { value: 'LANGUAGE=de' },
      'accept-language': { value: 'fr, en;q=0.8, it;q=0.6' },
    })
    const result = handler(event)
    expect(result).toEqual({
      statusCode: 302,
      statusDescription: 'Found',
      headers: expect.objectContaining({
        location: { value: 'https://shiftcode.io/de' },
      }),
    })
  })
})
