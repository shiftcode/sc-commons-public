import { getEnumKeyFromNum, getEnumKeyFromValue, getEnumKeys, getEnumValues, isValueFromEnum } from './enum.js'

// string enum with key=val
enum Str {
  A = 'A',
  B = 'B',
}

// string enum with key!=val
enum Str2 {
  OK = '200_OK',
  ERROR = '400_ERROR',
}

// number enum with explicit values
enum Num {
  A = 25,
  B = 26,
  C = 27,
}

// number with implicit values
enum Num2 {
  OK,
  NOK,
}

// mixed enum
enum Mix {
  A = 7,
  B = 42,
  C = 'C',
  D = 'FOO',
}

/**
 * assert the subject satisfies the specified type T
 */
function assertType<T>(subject: T): void {
  return
}

describe('enum helper', () => {
  describe('getEnumValues', () => {
    it('works for number enums', () => {
      expect(getEnumValues(Num)).toEqual([25, 26, 27])
      assertType<number[]>(getEnumValues(Num))
      expect(getEnumValues(Num2)).toEqual([0, 1])
    })
    it('works for string enums', () => {
      expect(getEnumValues(Str)).toEqual(['A', 'B'])
      assertType<Str[]>(getEnumValues(Str))
      expect(getEnumValues(Str2)).toEqual(['200_OK', '400_ERROR'])
      assertType<Str2[]>(getEnumValues(Str2))
    })
    it('works for mixed enums', () => {
      expect(getEnumValues(Mix)).toEqual([7, 42, 'C', 'FOO'])
      assertType<Array<string | number>>(getEnumValues(Mix))
    })
  })
  describe('getEnumKeys', () => {
    it('works for number enums', () => {
      expect(getEnumKeys(Num)).toEqual(['A', 'B', 'C'])
      assertType<Array<'A' | 'B' | 'C'>>(getEnumKeys(Num))
      expect(getEnumKeys(Num2)).toEqual(['OK', 'NOK'])
    })
    it('works for string enums', () => {
      expect(getEnumKeys(Str)).toEqual(['A', 'B'])
      assertType<Array<'A' | 'B'>>(getEnumKeys(Str))
      expect(getEnumKeys(Str2)).toEqual(['OK', 'ERROR'])
    })
    it('works for mixed enums', () => {
      expect(getEnumKeys(Mix)).toEqual(['A', 'B', 'C', 'D'])
      assertType<Array<'A' | 'B' | 'C' | 'D'>>(getEnumKeys(Str))
    })
  })
  describe('getEnumKeyFromValue', () => {
    it('works for number enums', () => {
      expect(getEnumKeyFromValue(Num, Num.A)).toEqual('A')
      expect(getEnumKeyFromValue(Num, 'A')).toEqual(null)
      expect(getEnumKeyFromValue(Num2, Num2.NOK)).toEqual('NOK')
      expect(getEnumKeyFromValue(Num2, -1)).toEqual(null)
      expect(getEnumKeyFromValue(Num2, 'OK')).toEqual(null)
    })
    it('works for string enums', () => {
      expect(getEnumKeyFromValue(Str, Str.A)).toEqual('A')
      expect(getEnumKeyFromValue(Str2, Str2.ERROR)).toEqual('ERROR')
      expect(getEnumKeyFromValue(Str2, '500_SERVICE_FAIL')).toEqual(null)
      expect(getEnumKeyFromValue(Str2, 'OK')).toEqual(null)
    })
    it('works for mixed enums', () => {
      expect(getEnumKeyFromValue(Mix, Mix.B)).toEqual('B')
      expect(getEnumKeyFromValue(Mix, 'B')).toEqual(null)
      expect(getEnumKeyFromValue(Mix, Mix.C)).toEqual('C')
      expect(getEnumKeyFromValue(Mix, Mix.D)).toEqual('D')
      expect(getEnumKeyFromValue(Mix, 0)).toEqual(null)
    })
  })
  describe('getEnumKeyFromNum', () => {
    it('works for number enums', () => {
      expect(getEnumKeyFromNum(Num, Num.A)).toEqual(<keyof Num>'A')
      expect(getEnumKeyFromNum(Num2, Num2.OK)).toEqual(<keyof Num>'OK')
    })
  })
  describe('isValueFromEnum', () => {
    it('works for StringEnums', () => {
      expect(isValueFromEnum(Str, 'C')).toEqual(false)
      expect(isValueFromEnum(Str, 'A')).toEqual(true)

      const a: unknown = 'A'
      if (isValueFromEnum(Str, a)) {
        assertType<Str>(a)
      }

      expect(isValueFromEnum(Str2, 'OK')).toEqual(false)
      expect(isValueFromEnum(Str2, '200_OK')).toEqual(true)
    })
  })
})
