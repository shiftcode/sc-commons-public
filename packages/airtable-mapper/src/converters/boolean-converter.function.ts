export function booleanConverter(value: boolean | undefined) {
  if (value === undefined) {
    return false
  }
  return value
}
