import { isDefined } from '../ts-guards/is-defined.js'

/**
 * returns the value of the provided key on given object. throws if the value is null or undefined
 */
export function getValueAssertDefined<T, K extends keyof T>(obj: T, key: K): NonNullable<T[K]> {
  type X = NonNullable<T[K]>
  const value: X | null | undefined = <any>obj[key]

  if (!isDefined(value)) {
    throw new Error(`Expected property "${String(key)}" to be defined. Was "${value}" instead`)
  }
  return value
}
