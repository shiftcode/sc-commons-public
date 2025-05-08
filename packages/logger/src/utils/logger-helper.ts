/**
 * returns a hex color generated from given string
 */
export function stringToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let k = 0; k < 3; k++) {
    const value = (hash >> (k * 8)) & 0xff
    color += ('00' + value.toString(16)).slice(-2)
  }
  return color
}
