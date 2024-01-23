/**
 * returns the value clamped to the inclusive range of min and max
 * @example ```ts
 * clamp(0, 2, 5) // 2
 * clamp(0, 10, 5) // 5
 * clamp(0, -3, 5) // 0
 * ```
 */
export function clamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
