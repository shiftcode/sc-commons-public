/**
 * Creates a CloudFront Function code string for language-based redirection.
 * The function checks the request path, cookies, and Accept-Language header to determine the appropriate language.
 * this Code is expected to run in JavaScript runtime 2.0 from CloudFront.
 * see {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-20.html}
 */
export function createLanguageRedirectCfFn<T extends string>(
  languages: T[],
  fallback: T,
  languageCookieName: string = 'LANGUAGE',
): string {
  return `
const languages = ${JSON.stringify(languages)};
const FALLBACK_LANG = ${JSON.stringify(fallback)};
const COOKIE_NAME = ${JSON.stringify(languageCookieName)};

function handler(event) {
  const headers = event.request.headers

  const pathParts = event.request.uri.split('/').filter((part) => part.length > 0)
  if (pathParts.length > 0 && languages.includes(pathParts[0])) {
    return event.request
  }

  const proposedLanguage = getProposedLanguage(
    languages,
    getCookieValue(headers.cookie ? headers.cookie.value : '', COOKIE_NAME),
    headers['accept-language'],
    FALLBACK_LANG,
  )

  const host = headers.host ? headers.host.value : ''
  const uri = event.request.uri === '/' ? '' : event.request.uri

  return {
    statusCode: 302,
    statusDescription: 'Found',
    headers: {
      location: { value: \`https://\${host}/\${proposedLanguage}\${uri}\` },
      'cache-control': { value: 'max-age=3600' },
      'content-type': { value: 'text/plain' },
    }
  }
}

function getProposedLanguage(languages, languageCookie, acceptLanguageHeader, fallbackLanguage) {
  if (languages.includes(languageCookie)) {
    return languageCookie
  }
  if (acceptLanguageHeader) {
    const acceptedLanguages = acceptLanguageHeader.value.split(',')
    for (let i = 0; i < acceptedLanguages.length; i++) {
      const lang = acceptedLanguages[i].split(';')[0].trim()
      if (languages.includes(lang)) {
        return lang
      }
    }
  }
  return fallbackLanguage
}

function getCookieValue(cookieString, cookieName) {
  if (!cookieString) {
    return null
  }
  const cookies = cookieString.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.indexOf(cookieName + '=') === 0) {
      return cookie.substring(cookieName.length + 1)
    }
  }
  return null
}
`
}
