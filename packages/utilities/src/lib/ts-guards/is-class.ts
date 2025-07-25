export function isClass<T extends new (...args: any[]) => any>(v: T): v is T
export function isClass(v: any): v is new (...args: any[]) => any
export function isClass(v: any): v is new (...args: any[]) => any {
  return typeof v === 'function' && /^\s*class\s+/.test(v.toString())
}