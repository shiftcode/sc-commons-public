import { formatError } from './format-error.function.js'

type JsonStringifyReplacer = (key: string, value: unknown) => unknown

/**
 * handles circular references & bigints and formats errors
 * @param jsonStringifyReplacer - custom replacer function which is called prior to the built-in handling
 */
export function getJsonStringifyReplacer(jsonStringifyReplacer?: JsonStringifyReplacer): JsonStringifyReplacer {
  const references = new WeakSet<object>()

  return (key, value) => {
    let replacedValue = jsonStringifyReplacer ? jsonStringifyReplacer(key, value) : value

    if (typeof replacedValue === 'bigint') {
      return replacedValue.toString()
    } else if (replacedValue instanceof Error) {
      replacedValue = formatError(replacedValue)
    }

    if (typeof replacedValue === 'object' && replacedValue !== null) {
      if (references.has(replacedValue)) {
        return `<circular reference>`
      } else {
        references.add(replacedValue)
      }
    }

    return replacedValue
  }
}
