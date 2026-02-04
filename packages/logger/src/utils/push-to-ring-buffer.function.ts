/**
 * Push an item to a ring buffer array. If the buffer exceeds maxSize, the oldest entry is removed.
 */
export function pushToRingBuffer<T>(buffer: T[], item: T, maxSize: number): void {
  if (maxSize <= 0) {
    while (buffer.shift()) {
      // just clears the buffer
    }
    return
  }

  buffer.push(item)
  while (buffer.length > maxSize) {
    buffer.shift()
  }
}
