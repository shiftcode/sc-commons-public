import { makeDeferred } from './make-deferred.function.js'

describe('makeDeferred', () => {
  test('returns an object containing a promise', () => {
    const { promise } = makeDeferred()
    expect(promise).toBeInstanceOf(Promise)
  })

  test('resolves the returned promise with the returned resolveFn', async () => {
    const { promise, resolve } = makeDeferred()
    resolve('foo')
    await expect(promise).resolves.toBe('foo')
  })

  test('rejects the returned promise with the returned rejectFn', async () => {
    const { promise, reject } = makeDeferred()
    reject(new Error('Foo Bar'))
    await expect(promise).rejects.toThrow('Foo Bar')
  })
})
