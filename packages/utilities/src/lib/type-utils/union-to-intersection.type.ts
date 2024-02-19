/**
 * transforms a union type to an intersection type
 * for explanation see here: https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
 * @example
 * type X = UnionToIntersection<{ a: boolean } | { b: string }> // --> {a: boolean } & { b: string }
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
