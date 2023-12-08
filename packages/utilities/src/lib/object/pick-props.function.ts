export type PickedPropsOrNull<T, K extends keyof T> = {
  [key in K]-?: T[key] extends null ? T[key] | null : T extends undefined ? T[key] | null : T[key]
}

/**
 * returns a new object containing only the provided props with their respective values or null when not defined
 */
export function pickProps<T extends object, K extends keyof T>(obj: T, props: readonly K[]): PickedPropsOrNull<T, K> {
  return <any>Object.fromEntries(props.map((p) => [p, obj[p] ?? null]))
}
