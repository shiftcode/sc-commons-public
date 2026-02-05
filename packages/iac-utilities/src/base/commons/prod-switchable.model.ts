/**
 * Object with values for prod and nonProd
 */
export interface ProdSwitchable<T> {
  prod: T
  nonProd: T
}

export type ProdSwitchableKey<P> = {
  [Key in keyof P]: P[Key] extends ProdSwitchable<any> ? P[Key]['prod' | 'nonProd'] : never
}
