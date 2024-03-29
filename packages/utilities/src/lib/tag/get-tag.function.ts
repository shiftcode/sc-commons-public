import { Tag } from './tag.enum.js'

/**
 * @return Returns the value (we call it tag) returned by function call `value.toString`,
 */
export function getTag(value: any): Tag | string {
  return {}.toString.call(value)
}
