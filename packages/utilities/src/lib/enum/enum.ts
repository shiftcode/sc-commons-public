/**
 * this is highly dependent on how typescript builds enums
 * which is special by the way:
 * - when enum item value is number, reverse relation is added to the object:
 * enum N { OK = 200 } --> { '200': 'OK', 'OK': 200,}
 * - when enum item value is string, no reverse relation is added to the object:
 * enum S { ERROR = '500_FAIL' } --> { 'ERROR': '500_FAIL' }
 *
 * a mixed enum would look like this:
 * enum Mixed {OK = 200, ERROR = '500_FAIL' } --> { '200': 'OK', 'ERROR': '500_FAIL', 'OK': 200}
 */

export type StringEnum<E> = Record<keyof E, string>
export type NumberEnum<E> = Record<keyof E, number> & { [k: number]: string }
export type MixedEnum<E> = Record<keyof E, string | number> & { [k: number]: string }

export type EnumValuesOf<E> = E extends Record<any, infer U> ? U : never

/**
 * returns all actual values of an enum with string values
 */
export function getEnumValues<E extends StringEnum<E>>(en: E): Array<EnumValuesOf<E>>
/**
 * returns all actual values of an enum with number values
 */
export function getEnumValues<E extends NumberEnum<E>>(en: E): number[]
/**
 * returns all actual values of an enum with string or number values (which you probably shouldn't do)
 */
export function getEnumValues<E extends MixedEnum<E>>(en: E): Array<string | number>
export function getEnumValues<E extends MixedEnum<E>>(en: E): Array<string | number> {
  const keys = Object.keys(en)

  return keys
    .map((key) => <[keyof E, string | number]>[key, (<any>en)[key]])
    .filter(([k, v]) => k === v || typeof v === 'number' || keys.indexOf(v) === -1)
    .map(([_, v]) => v)
}

/**
 * returns all actual keys of an enum
 */
export function getEnumKeys<E extends MixedEnum<E>>(en: E): Array<keyof E> {
  const keys = Object.keys(en)
  return keys
    .map((key) => <[keyof E, string | number]>[key, (<any>en)[key]])
    .filter(([k, v]) => k === v || typeof v === 'number' || keys.indexOf(v) === -1)
    .map(([k]) => k)
}

/**
 * returns the enum property name for given value or null if not a value of given enum
 */
export function getEnumKeyFromValue<E extends MixedEnum<E>>(en: E, value: any): keyof E | null {
  const keys = Object.keys(en)
  const r = keys
    .map((key) => <[keyof E, string | number]>[key, (<any>en)[key]])
    .find(([k, v]) => (k === v || typeof v === 'number' || keys.indexOf(v) === -1) && v === value)
  return (r && r[0]) || null
}

export function getEnumKeyFromNum<E extends NumberEnum<E>>(en: E, value: number): keyof E {
  return en[value]
}

export function isValueFromEnum<E extends StringEnum<any>>(e: E, value: unknown): value is EnumValuesOf<E> {
  return Object.values(e).includes(<string>value)
}
