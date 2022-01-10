// @ts-ignore
/**
 * replaces map and set objects with plain object representing the type and the values
 * set -> { type: 'set', values: ['value1', 'value2'] }
 * map -> { type: 'map', values: [ ['key2','value1'], ['key2', 'value2'] ] }
 */
export function jsonMapSetStringifyReplacer(key: string, value: any) {
  return value instanceof Set
    ? { type: 'scStringifiedSet', values: Array.from(value.values()) }
    : value instanceof Map
    ? { type: 'scStringifiedMap', entries: Array.from(value.entries()) }
    : value
}
