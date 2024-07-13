/**
 * groups the collection values by their value of given property or their returned value of given function
 * @example:
 * ```
 *  groupBy([3.5, 3.2, 6], Math.floor) // { 3: [3.5, 3.2], 6: [6] }
 *  groupBy(['a', 'cc', 'dd', 'b'], 'length') //  { 1: ['a', 'b'], 2: ['cc', 'dd'] }
 * ```
 */
export function groupBy<T>(collection: T[], propOrFn: keyof T | ((val: T) => string | number)): Record<string, T[]> {
  const valFn: (v: T) => any = typeof propOrFn === 'function' ? propOrFn : (v: T) => v[propOrFn]
  return collection.reduce(
    (u, i) => {
      const vk: any = valFn(i)
      u[vk] = u[vk] ? [...u[vk], i] : [i]
      return u
    },
    <Record<string, T[]>>{},
  )
}
