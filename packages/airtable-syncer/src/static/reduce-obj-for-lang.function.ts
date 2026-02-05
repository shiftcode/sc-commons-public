import { KEY_VALUE_SYMBOL } from '../model/key-value.symbol.js'

const isDefined = (obj: any) => (lang: any) => obj[lang] !== undefined && obj[lang] !== ''

/**
 * recursively replaces key-value objects with the value corresponding to the first language
 * or fallback with next non-undefined value in or lang from
 */
export function reduceObjForLang(obj: any, withLanguage: string[]): any {
  if (!obj || typeof obj !== 'object') {
    return obj
  } else if (Array.isArray(obj)) {
    return obj.map((i) => reduceObjForLang(i, withLanguage))
  } else if (KEY_VALUE_SYMBOL in obj) {
    // replace the KV object with the actual value of given language
    // if object is not defined or empty, fallback to another lang in the order defined in config
    return isDefined(obj)(withLanguage[0])
      ? obj[withLanguage[0]]
      : `${withLanguage[0]}:: ${<string>obj[withLanguage.find(isDefined(obj)) || withLanguage[0]]}`
  } else {
    return Object.entries(obj).reduce(
      (u, [k, v]) => {
        u[k] = reduceObjForLang(v, withLanguage)
        return u
      },
      <any>{},
    )
  }
}
