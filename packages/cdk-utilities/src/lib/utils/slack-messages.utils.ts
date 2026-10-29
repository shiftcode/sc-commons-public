export function escapeForSlack(text: string) {
  // https://api.slack.com/reference/surfaces/formatting#escaping
  if (text) {
    return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  }
  return ''
}

const SLACK_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;' }

/**
 * Escapes the text like `escapeForSlack`, but cuts it so the escaped result (including the truncation suffix)
 * never exceeds `maxLength`. Characters are escaped one by one, so an entity like `&amp;` is never split.
 */
export function escapeForSlackTruncated(text: string, maxLength: number, suffix = '… (truncated)'): string {
  const escaped = escapeForSlack(text)
  if (escaped.length <= maxLength) {
    return escaped
  }
  const budget = maxLength - suffix.length
  let result = ''
  for (const char of text) {
    const piece = SLACK_ESCAPES[char] ?? char
    if (result.length + piece.length > budget) {
      break
    }
    result += piece
  }
  return result + suffix
}

export function replaceTabs(text: string) {
  return text.replaceAll('\t', '    ')
}
