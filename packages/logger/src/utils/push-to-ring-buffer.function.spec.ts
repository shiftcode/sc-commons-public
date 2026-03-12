import { describe, expect, test } from 'vitest'

import { pushToRingBuffer } from './push-to-ring-buffer.function.js'

describe('pushToRingBuffer', () => {
  test('should push items to the buffer and maintain max size', () => {
    const buffer: number[] = []
    const maxSize = 3

    pushToRingBuffer(buffer, 1, maxSize)
    pushToRingBuffer(buffer, 2, maxSize)
    pushToRingBuffer(buffer, 3, maxSize)
    expect(buffer).toEqual([1, 2, 3])

    pushToRingBuffer(buffer, 4, maxSize)
    expect(buffer).toEqual([2, 3, 4])
  })

  test('removes all items that are too many and keeps the tail', () => {
    const buffer = [1, 2, 3, 4]
    const maxSize = 2

    pushToRingBuffer(buffer, 5, maxSize)
    expect(buffer).toEqual([4, 5])
  })

  test('does not throw or fail for negative maxSize but simply clears the buffer', () => {
    const buffer1: string[] = ['foo']
    pushToRingBuffer(buffer1, 'bar', -1)
    expect(buffer1).toEqual([])
  })

  test('does not throw or fail for zero maxSize but simply clears the buffer', () => {
    const buffer2: string[] = ['foo']
    pushToRingBuffer(buffer2, 'bar', 0)
    expect(buffer2).toEqual([])
  })
})
