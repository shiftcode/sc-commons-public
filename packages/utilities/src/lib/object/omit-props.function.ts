/**
 * returns a new object with all properties but the provided.
 */
export function omitProps<T extends object, K extends keyof T>(
  obj: T,
  props: readonly K[],
): Omit<T, (typeof props)[number]> {
  return <any>Object.fromEntries(Object.entries(obj).filter(([k]) => !props.includes(<K>k)))
}
