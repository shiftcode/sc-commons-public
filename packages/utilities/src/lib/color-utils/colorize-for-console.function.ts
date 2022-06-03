import { hexToRgb } from './hex-to-rgb.function'

export type RGB = [red: number, green: number, blue: number]

const bg = {
  start: ([r, g, b]: RGB) => `\u001B[${48};2;${r};${g};${b}m`,
  close: '\u001B[49m',
}
const fg = {
  start: ([r, g, b]: RGB) => `\u001B[${38};2;${r};${g};${b}m`,
  close: '\u001B[39m',
}

/** colorize string to print to console. optionaly a background color can be provided. */
export function colorizeForConsole(message: string, hexColor: string, hexBgColor: string | null = null) {
  const v = `${fg.start(hexToRgb(hexColor))}${message}${fg.close}`
  return hexBgColor ? `${bg.start(hexToRgb(hexBgColor))}${message}${bg.close}` : v
}
