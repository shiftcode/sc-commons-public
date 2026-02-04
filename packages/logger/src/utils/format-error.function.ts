export interface ErrorAttributes {
  [key: string]: unknown

  name: string
  location: string
  message: string
  stack?: string
  cause?: unknown
}

/**
 * Format an error into a loggable object.
 *
 * @example
 * ```json
 * {
 *   "name": "Error",
 *   "location": "file.js:1",
 *   "message": "An error occurred",
 *   "stack": "Error: An error occurred\n    at file.js:1\n    at file.js:2\n    at file.js:3",
 *   "cause": {
 *     "name": "OtherError",
 *     "location": "file.js:2",
 *     "message": "Another error occurred",
 *     "stack": "Error: Another error occurred\n    at file.js:2\n    at file.js:3\n    at file.js:4"
 *   }
 * }
 * ```
 *
 * @param error - Error to format
 */
export function formatError(error: Error): ErrorAttributes {
  const { name, message, stack, cause, ...errorAttributes } = error
  const formattedError: ErrorAttributes = {
    name,
    location: getCodeLocation(error.stack),
    message,
    stack,
    cause: cause instanceof Error ? formatError(cause) : cause,
  }
  for (const key in error) {
    if (typeof key === 'string' && !['name', 'message', 'stack', 'cause'].includes(key)) {
      formattedError[key] = (errorAttributes as Record<string, unknown>)[key]
    }
  }

  return formattedError
}

/**
 * Get the location of an error from a stack trace.
 *
 * @param stack - stack trace to parse
 */
function getCodeLocation(stack?: string): string {
  if (!stack) {
    return ''
  }

  const stackLines = stack.split('\n')
  const regex = /\(([^()]*?):(\d+?):(\d+?)\)\\?$/

  for (const item of stackLines) {
    const match = regex.exec(item)

    if (Array.isArray(match)) {
      return `${match[1]}:${Number(match[2])}`
    }
  }

  return ''
}
