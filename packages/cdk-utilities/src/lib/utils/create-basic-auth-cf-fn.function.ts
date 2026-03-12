export function createBasicAuthCfFn(user: string, pw: string): string {
  const auth = 'Basic ' + Buffer.from(`${user}:${pw}`).toString('base64')
  return `
function handler(event) {
  var authHeader = event.request.headers['authorization']
  if (authHeader && authHeader.value === '${auth}') {
    return event.request
  }
  return {
    statusCode: 401,
    statusDescription: 'Unauthorized',
    headers: { 'www-authenticate': { value: 'Basic' } }
  }
}
`
}
