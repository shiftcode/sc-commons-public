export function escapeForSlack(text: string) {
  // https://api.slack.com/reference/surfaces/formatting#escaping
  if (text) {
    return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  }
  return ''
}

export function replaceTabs(text: string) {
  return text.replaceAll('\t', '    ')
}
