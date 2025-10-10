/* eslint-disable @typescript-eslint/no-unsafe-return */
import { getTag } from '../tag/get-tag.function.js'
import { Tag } from '../tag/tag.enum.js'

/**
 * Creates a new object with the predicate applied to each value in a deep manner
 *
 * @param collection (object or array)
 * @param predicate will be applied to each value, will be called with value, key (key of obj | index in arr), obj (obj | arr)
 * @return Returns a new object with the predicate applied to each value
 */
export function mapValuesDeep(
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  collection: any | null | undefined,
  predicate: (value: any, keyOrIndex: any /* keyOrIndex of obj | index in arr */, obj: any /* obj | arr */) => any,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
): any | null | undefined {
  if (collection === null || collection === undefined) {
    return collection
  }

  if (Array.isArray(collection)) {
    if (collection.length === 0) {
      return predicate(collection, null, collection)
    } else {
      return collection.map((arrItem: any) => mapValuesDeep(arrItem, predicate))
    }
  } else {
    const result: Record<any, any> = {}
    const keys = Object.keys(collection)
    for (const key of keys) {
      const value = collection[key]
      if (Array.isArray(value)) {
        if (value.length === 0) {
          result[key] = predicate(value, key, collection)
        } else {
          // map arr items
          result[key] = value.map((arrItem: any, index: number, array: any[]) => {
            if (needsDeepMapping(arrItem)) {
              return mapValuesDeep(arrItem, predicate)
            } else {
              return predicate(arrItem, index, array)
            }
          })
        }
      } else if (getTag(collection[key]) === Tag.OBJECT) {
        // go deep
        result[key] = mapValuesDeep(value, predicate)
      } else {
        result[key] = predicate(value, key, collection)
      }
    }

    return result
  }
}

function needsDeepMapping(value: any): boolean {
  return Array.isArray(value) || getTag(value) === Tag.OBJECT
}
