export interface Deferred<T> {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason: unknown) => void
  promise: Promise<T>
}

/**
 * returns a `deferred` object which contains a promise and its resolve/reject functions
 * @example ```ts
 * const deferred = new makeDeferred<string>()
 *
 * // use promise
 * deferred.promise.then(console.log, console.error)
 *
 * // resolve
 * deferred.resolve('a value')
 *
 * // reject
 * deferred.reject(new Error('oh no!'))
 * ```
 */
export function makeDeferred<T>(): Deferred<T> {
  const deferred: Deferred<T> = <any>{}

  deferred.promise = new Promise<T>((res, rej) => {
    deferred.resolve = res
    deferred.reject = rej
  })
  return deferred
}
