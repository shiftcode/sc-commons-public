import * as https from 'node:https'

class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message)
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface GithubRelease {
  id: number
  tag_name: string
  html_url: string
}

interface CreateReleasePayload {
  tag_name: string
  name: string
  body: string
  prerelease: boolean
  target_commitish?: string
}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * Executes a GitHub REST API request and returns the parsed JSON response body.
 */
function githubApiRequest<T>(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  repoPath: string,
  token: string,
  data?: object,
): Promise<T> {
  const payload = data ? JSON.stringify(data) : undefined
  return new Promise<T>((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.github.com',
        path: repoPath,
        method,
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'publish-helper',
          ...(payload
            ? {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
              }
            : {}),
        },
      },
      (res) => {
        res.setEncoding('utf8')
        let body = ''
        res.on('data', (chunk: string) => (body += chunk))
        res.on('end', () => {
          if (res.statusCode === 204) {
            resolve(undefined as T)
            return
          }
          let parsed: T
          try {
            parsed = JSON.parse(body) as T
          } catch {
            reject(new Error(`Failed to parse GitHub API response (${res.statusCode}): ${body}`))
            return
          }
          if (res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed)
          } else {
            reject(
              new ApiError(
                res.statusCode ?? 0,
                `GitHub API ${method} ${repoPath} failed with ${res.statusCode}: ${body}`,
              ),
            )
          }
        })
      },
    )
    req.on('error', reject)
    if (payload) {
      req.write(payload)
    }
    req.end()
  })
}

/**
 * Returns the existing GitHub Release for the given tag name, or null if none exists.
 */
export async function getExistingRelease(
  repository: string,
  token: string,
  tagName: string,
): Promise<GithubRelease | null> {
  try {
    return await githubApiRequest<GithubRelease>('GET', `/repos/${repository}/releases/tags/${tagName}`, token)
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null
    }
    throw err
  }
}

/**
 * Deletes the GitHub Release with the given id.
 */
async function deleteRelease(repository: string, token: string, releaseId: number): Promise<void> {
  await githubApiRequest<void>('DELETE', `/repos/${repository}/releases/${releaseId}`, token)
}

/**
 * Deletes the git tag with the given name from the remote repository.
 */
async function deleteRemoteTag(repository: string, token: string, tagName: string): Promise<void> {
  await githubApiRequest<void>('DELETE', `/repos/${repository}/git/refs/tags/${tagName}`, token)
}

/**
 * Creates a new GitHub Release.
 */
async function createRelease(repository: string, token: string, payload: CreateReleasePayload): Promise<GithubRelease> {
  return githubApiRequest<GithubRelease>('POST', `/repos/${repository}/releases`, token, payload)
}

/**
 * Builds the release tag name for a run.
 * Stable runs: `releases/YYYY-MM-DDTHH-MM-SS`
 * Pre-release runs: `releases/{stage}` (e.g. `releases/pr84`)
 */
export function buildReleaseTag(isPrerelease: boolean, stage: string): string {
  if (isPrerelease) {
    return `releases/${stage}`
  }
  const now = new Date()
  const ts = now.toISOString().slice(0, 19).replace(/:/g, '-')
  return `releases/${ts}`
}

/**
 * Builds the release body listing all published packages with Changelog Links.
 */
export function buildReleaseBody(packageTags: string[], repository: string, ref: string = 'main'): string {
  const lines: string[] = ['## Package Version Set', '']
  for (const tag of packageTags) {
    const match = tag.match(/^(@shiftcode\/[^@]+)@(.+)$/)
    if (!match) continue
    const [, packageName, version] = match
    const packageDir = packageName.replace('@shiftcode/', '')
    const changelogUrl = `https://github.com/${repository}/blob/${ref}/packages/${packageDir}/CHANGELOG.md`
    lines.push(`- **${packageName}** \`${version}\` — [Changelog](${changelogUrl})`)
  }
  return lines.join('\n')
}

/**
 * Publishes a consolidated GitHub Release for the given package tags.
 * For pre-releases (PR runs) the existing release for the same tag is replaced.
 */
export async function publishConsolidatedRelease(
  repository: string,
  token: string,
  packageTags: string[],
  isPrerelease: boolean,
  stage: string,
  targetCommitish: string,
): Promise<void> {
  if (packageTags.length === 0) {
    console.log('publish-libs:: No new package tags – skipping GitHub Release creation.')
    return
  }

  const releaseTag = buildReleaseTag(isPrerelease, stage)
  // Derive date for stable release name from the computed tag to avoid a second Date() call.
  const releaseName = isPrerelease
    ? `Pre-release ${stage}`
    : `Release ${releaseTag.replace('releases/', '').slice(0, 10)}`
  const body = buildReleaseBody(packageTags, repository, targetCommitish)

  // For PR pre-releases, remove any existing release+tag so the new one points to the latest commit.
  if (isPrerelease) {
    const existing = await getExistingRelease(repository, token, releaseTag)
    if (existing !== null) {
      console.log(`publish-libs:: Replacing existing GitHub Release for ${releaseTag}`)
      await deleteRelease(repository, token, existing.id)
      await deleteRemoteTag(repository, token, releaseTag)
    }
  }

  const release = await createRelease(repository, token, {
    tag_name: releaseTag,
    name: releaseName,
    body,
    prerelease: isPrerelease,
    target_commitish: targetCommitish,
  })

  console.log(`publish-libs:: GitHub Release created: ${release.html_url}`)
}
