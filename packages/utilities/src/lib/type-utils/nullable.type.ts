/**
 * makes all properties of a generic type nullable
 */
export type Nullable<Base> = {
  [Key in keyof Base]: Base[Key] | null
}
