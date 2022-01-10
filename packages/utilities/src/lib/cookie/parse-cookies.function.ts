export function parseCookies(cookiesString?: string | null): Record<string, string | null> {
  return (cookiesString || '')
    .split(';')
    .filter((v) => v !== '')
    .map((v) => {
      const splitted = v.split('=')
      if (splitted.length === 2) {
        return [splitted[0].trim(), splitted[1].trim()] as const
      } else {
        return [splitted[0].trim(), null] as const
      }
    })
    .reduce((u, [key, value]) => ({ ...u, [key]: value }), <Record<string, string | null>>{})
}
