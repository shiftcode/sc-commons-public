/**
 * Checks if the provided value is a number. (NaN is technically a number, but this function returns false for NaN.)
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}
