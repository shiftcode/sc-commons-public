export function isClass<T extends new (...args: any[]) => any>(v: T): v is T
export function isClass(value: unknown): value is new (...args: any[]) => any
export function isClass(value: unknown): value is new (...args: any[]) => any {
  return typeof value === 'function' && /^\s*class\s+/.test(value.toString())
}