import { getTag } from '../tag/get-tag.function.js'
import { Tag } from '../tag/tag.enum.js'

/*
  primitives: value1 === value2
  functions: value1.toString == value2.toString
  arrays: if length, sequence and values of properties are identical
  objects: if length, names and values of properties are identical
  compare([[1, [2, 3]], [[1, [2, 3]]); // true
  compare([[1, [2, 3], 4], [[1, [2, 3]]); // false
  compare({a: 2, b: 3}, {a: 2, b: 3}); // true
  compare({a: 2, b: 3}, {b: 3, a: 2}); // true
  compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
  compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
  compare([[1, [2, {a: 4}], 4], [[1, [2, {a: 4}]]); // true
*/
type Customizer = (value1: any, value2: any) => boolean | undefined

/**
 * base source copied from https://github.com/angus-c/just/blob/master/packages/collection-compare/index.js
 * LICENSE: https://github.com/angus-c/just/blob/master/LICENSE
 * primitives: value1 === value2
 * functions: value1.toString == value2.toString
 * arrays: if length, sequence and values of properties are identical
 * objects: if length, names and values of properties are identical
 *
 * enhanced with customizer
 */

/*
 * if both values are NaNs return true
 * let a = NaN, b = NaN
 * a === b -> false
 */
export function compareWith(value1: any, value2: any, customizer?: Customizer) {
  if (customizer && customizer(value1, value2)) {
    return true
  }

  if (value1 === value2) {
    return true
  }

  // if both values are NaNs return true
  if (value1 !== value1 && value2 !== value2) {
    return true
  }

  if (getTag(value1) !== getTag(value2)) {
    return false
  }

  if (value1 !== Object(value1)) {
    // non equal primitives
    return false
  }

  if (!value1) {
    return false
  }

  if (Array.isArray(value1)) {
    return compareArrays(value1, value2, customizer)
  }

  if (getTag(value1) === Tag.OBJECT) {
    return compareObjects(value1, value2, customizer)
  } else {
    return compareNativeSubtypes(value1, value2, customizer)
  }
}

function compareNativeSubtypes(value1: any, value2: any, customizer?: Customizer): boolean {
  if (customizer && customizer(value1, value2)) {
    return true
  }

  // e.g. Function, RegExp, Date
  return value1.toString() === value2.toString()
}

function compareArrays(value1: any[], value2: any[], customizer?: Customizer): boolean {
  const len = value1.length
  if (len !== value2.length) {
    return false
  }

  let alike = true
  for (let i = 0; i < len; i++) {
    if (!compareWith(value1[i], value2[i], customizer)) {
      alike = false
      break
    }
  }
  return alike
}

function compareObjects(value1: any, value2: any, customizer?: Customizer): boolean {
  const keys1 = Object.keys(value1).sort()
  const keys2 = Object.keys(value2).sort()
  const len = keys1.length
  if (len !== keys2.length) {
    return false
  }
  for (let i = 0; i < len; i++) {
    const key1 = keys1[i]
    const key2 = keys2[i]
    if (!(key1 === key2 && compareWith(value1[key1], value2[key2], customizer))) {
      return false
    }
  }
  return true
}
