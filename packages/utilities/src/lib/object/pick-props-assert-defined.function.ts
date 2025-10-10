import { isDefined } from '../ts-guards/is-defined.js'

export type PickedPropsDefined<T, K extends keyof T> = {
  [key in K]-?: NonNullable<T[key]>
}

/**
 * returns an object containing the provided props with their respective value. throws if their value is null or undefined
 */
export function pickPropsAssertDefined<T, TProp extends keyof T>(
  obj: T,
  props: readonly TProp[],
): PickedPropsDefined<T, TProp> {
  const entries = props.map((p) => {
    if (!isDefined(obj[p])) {
      throw new Error(`Expected property "${String(p)}" to be defined. Was "${String(obj[p])}" instead`)
    }
    return [p, obj[p]]
  })
  return Object.fromEntries(entries)
}
