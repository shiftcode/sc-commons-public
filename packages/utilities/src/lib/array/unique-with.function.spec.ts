import { describe, expect, test } from 'vitest'

import { compareWith } from '../compare-with/compare-with.js'
import { uniqueWith } from './unique-with.function.js'

describe('uniqueWith', () => {
  test('removes duplicates based on custom comparison function', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 1 }]
    const result = uniqueWith(array, (a, b) => a.id === b.id)
    expect(result).toHaveLength(2)
    expect(result).toEqual([{ id: 1 }, { id: 2 }])
  })

  test('returns empty array for empty input', () => {
    const result = uniqueWith([], () => true)
    expect(result).toEqual([])
  })

  test('keeps only first item when comparison function always returns true', () => {
    const array = [1, 2, 3]
    const result = uniqueWith(array, () => true)
    expect(result).toHaveLength(1)
    expect(result[0]).toBe(1)
  })

  test('works with primitive values', () => {
    const array = [1, 2, 2, 3, 1]
    const result = uniqueWith(array, (a, b) => a === b)
    expect(result).toEqual([1, 2, 3])
  })

  test('keeps first occurrence when duplicates exist', () => {
    const items = [
      { id: 1, value: 'first' },
      { id: 1, value: 'second' },
      { id: 1, value: 'third' },
    ]
    const result = uniqueWith(items, (a, b) => a.id === b.id)
    expect(result).toEqual([{ id: 1, value: 'first' }])
  })

  test('works with deep equality check using deep equal', () => {
    const array = [
      { id: 1, nested: { value: 'a' } },
      { id: 2, nested: { value: 'b' } },
      { id: 1, nested: { value: 'a' } },
      { id: 3, nested: { value: 'c' } },
    ]
    const result = uniqueWith(array, compareWith)
    expect(result).toHaveLength(3)
    expect(result).toEqual([
      { id: 1, nested: { value: 'a' } },
      { id: 2, nested: { value: 'b' } },
      { id: 3, nested: { value: 'c' } },
    ])
  })

  test('removes all items when comparison function always returns false (which means the comparison fn is broken)', () => {
    const array = [1, 2, 3]
    const result = uniqueWith(array, () => false)
    expect(result).toHaveLength(0)
  })
})
