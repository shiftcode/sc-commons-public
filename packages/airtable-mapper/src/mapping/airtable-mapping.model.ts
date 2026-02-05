type ActualMappingType<T> = T extends Array<infer U> ? NonNullable<U> : NonNullable<T>

export interface AirtablePropertyMapping {
  single: boolean
  fieldMapping: AirtableModelMapping<any> | null
  converter?: (value: any) => any
}

export interface AirtableModelMapping<T> {
  mappings: Map<keyof T, AirtablePropertyMapping>
  tableName: string
  fields: Array<keyof T>
}

export class AirtableMapping<T> implements AirtableModelMapping<T> {
  readonly tableName: string
  protected _mappings: Map<keyof T, AirtablePropertyMapping> = new Map()
  protected _fields: Array<keyof T> = []

  constructor(tableName: string) {
    this.tableName = tableName
  }

  addMapping<K extends keyof T>(
    property: K,
    mapping: AirtableModelMapping<ActualMappingType<T[K]>> | null,
    single = true,
    converter?: (value: any) => any,
  ): this {
    this._mappings.set(property, { single, fieldMapping: mapping, converter })
    return this
  }

  addFields(fields: Array<keyof T>): this {
    this._fields = [...this._fields, ...fields]
    return this
  }

  get mappings() {
    return this._mappings
  }

  get fields() {
    return [...this._fields, ...Array.from(this.mappings.keys())]
  }
}
