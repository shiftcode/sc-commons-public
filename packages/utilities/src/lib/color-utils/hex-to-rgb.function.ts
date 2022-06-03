/**
 * converts a hex color string to rgb values
 * @param hex either with or without # and 3 or 6 digits
 * @example ```
 * hexToRgb('#fc0') // => [255, 204, 0]
 * hexToRgb('ffcc00') // => [255, 204, 0]
 * ```
 */
export function hexToRgb(hex: string): [red: number, green: number, blue: number] {
  const matches = /^#?([a-f\d]{6}|[a-f\d]{3})$/i.exec(hex)
  if (!matches) {
    throw new Error('no valid color')
  }
  const hexString =
    matches[1].length === 3
      ? matches[1]
          .split('')
          .map((c) => c + c)
          .join('')
      : matches[1]

  const val = Number.parseInt(hexString, 16)

  // tslint:disable-next-line:no-bitwise
  return [(val >> 16) & 0xff, (val >> 8) & 0xff, val & 0xff]
}
