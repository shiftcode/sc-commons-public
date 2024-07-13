# publish-helper

> 🎯 Target runtime: es2023 ([Node >= 20](https://node.green/#ES2023))

Contains js scripts for publishing libraries

## Publish Lib [depends on lerna]
command: `publish-lib`

updates the package.json version and the changelog file (changelog only on main/master)\
and makes a commit with the updated versions.

make sure to provide the following env vars in the GitHub workflow:
- `GITHUB_CONTEXT: ${{ toJson(github) }}`
- `GH_TOKEN: ${{ secrets.GH_TOKEN_3 }}`

options:
- `--verbose` use lerna in verbose mode
- `--canary` use lerna canary mode instead of conventional-prerelease for PR releases

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
