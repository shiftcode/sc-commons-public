/**
 * Object with values for specific stages (pr??, xx??) if set or general prod/pr/xx
 */
export interface StageSwitchable<T> {
  prod: T
  pr: T
  xx: T

  // specific stage (pr??, xx??)
  [key: string]: T
}

export type StageSwitchableKey<P> = {
  [Key in keyof P]: P[Key] extends StageSwitchable<any> ? P[Key]['prod' | 'pr' | 'xx'] : never
}
