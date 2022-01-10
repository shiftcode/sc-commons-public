export type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}

/**
 * only allows prop names of given Base which fulfill the type condition
 * @example
 * interface MyType { a:string, b:string, c:boolean, d:number }
 * type MyTypeStringPropNames = AllowedNames<MyType, string> // -> 'a'|'b'
 */
export type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base]
