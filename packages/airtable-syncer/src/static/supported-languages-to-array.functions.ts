export function supportedLanguagesToArray(supportedLanguages: string): string[] {
  return supportedLanguages.trim().split(/,\s*/)
}
