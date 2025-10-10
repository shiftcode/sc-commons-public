/**
 * Checks if a value is defined (not undefined or null).
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}
