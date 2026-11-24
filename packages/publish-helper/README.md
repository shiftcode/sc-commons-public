# publish-helper

> 🎯 Target runtime: es2024 ([Node >= 24](https://node.green/#ES2024))

Contains js scripts for publishing libraries

## Publish Lib [depends on lerna]

command: `publish-lib`

updates the package.json version and the changelog file (changelog only on main/master)\
and makes a commit with the updated versions.

make sure to provide the following env vars in the GitHub workflow:

- `GITHUB_CONTEXT: ${{ toJson(github) }}`
- `GH_TOKEN: ${{ secrets.GH_TOKEN }}` (optional, required with `--create-release`)

options:

- `--verbose` use lerna in verbose mode
- `--canary` use lerna canary mode instead of conventional-prerelease for PR releases
- `--create-release` create a GitHub release for every published package version, with the generated changelog as release notes.
  Only applies to main/master releases (not to PR prereleases). Requires `GH_TOKEN` with permission to create releases.

## Prepare Dist

command: `prepare-dist`

Copies package.json and other files to the dist directory to allow publishing the dist instead of the package root.

When using another dir name than `dist` specify the name inside the package.json\

```json
{
  "publishConfig": {
    "directory": "out"
  }
}
```

options:

- `--include` copy additional files to the dist folder e.g. `--include extra.md`
