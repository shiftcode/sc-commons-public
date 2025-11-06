# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.1](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-config-recommended@6.0.0...@shiftcode/eslint-config-recommended@6.0.1) (2025-11-06)

**Note:** Version bump only for package @shiftcode/eslint-config-recommended

# [6.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-config-recommended@5.0.1...@shiftcode/eslint-config-recommended@6.0.0) (2025-11-04)

### Bug Fixes

- **eslint:** fix rule config ([d4dd222](https://github.com/shiftcode/sc-commons-public/commit/d4dd222c56acdf1e648ef1b764768b6ccdd9ea5e))
- **rules:** useful config for rule import/no-extraneous-dependencies ([3a9d398](https://github.com/shiftcode/sc-commons-public/commit/3a9d3986beb8b2c8742bf64240783c9256071ce5))

### Documentation

- **readme:** eslint v9.37 ([0b2340c](https://github.com/shiftcode/sc-commons-public/commit/0b2340caccf1aa192852e5d1062ba4cb0f1f95ca))

### Features

- **angular-rules:** turn on prefer-output-readonly and prefer-host-metadata-property ([e445f40](https://github.com/shiftcode/sc-commons-public/commit/e445f404fa012e4324a317fe8090ca0d048f67c6))
- **angular-template-rules:** turn off no-inline-styles ([e65870e](https://github.com/shiftcode/sc-commons-public/commit/e65870ede9941c11ea7f713ca3c1a607f194d996))
- **eslint-angular:** add improved config for simple-import-sort/imports ([de47a15](https://github.com/shiftcode/sc-commons-public/commit/de47a155460f78f72da12dc7c73613771e4a98f7))
- **eslint:** refine rule config ([2e7582a](https://github.com/shiftcode/sc-commons-public/commit/2e7582ac042032725f928f541f40f467d4f6b9b6))
- **eslint:** refine rule config ([66cdbc4](https://github.com/shiftcode/sc-commons-public/commit/66cdbc48c029cd237c10262319ca6f6fe2a139c1))
- **eslint:** refine rule config ([b0087ad](https://github.com/shiftcode/sc-commons-public/commit/b0087adb836b17a9f795a99b8c4e6f3ab524d4b3))
- **eslint:** refine rule config ([7016656](https://github.com/shiftcode/sc-commons-public/commit/70166568d5e9c4601633d0d40b73e8cf9ddf9c7a))
- **eslint:** sensible default ([45abe49](https://github.com/shiftcode/sc-commons-public/commit/45abe49c5981e6e45ae798d828d80878dc3f700e))
- replace cjs to mjs files ([de2580a](https://github.com/shiftcode/sc-commons-public/commit/de2580a2b0e8a8da97ac3a0ca884e5467ba91237))

### BREAKING CHANGES

- **readme:** - no eslint ^9.37 is required

* sc config is applied by using the exposed functions
* sc rules shall be used with recommended config

## [5.0.1](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-config-recommended@5.0.0...@shiftcode/eslint-config-recommended@5.0.1) (2025-09-09)

**Note:** Version bump only for package @shiftcode/eslint-config-recommended

# [5.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-config-recommended@4.0.0...@shiftcode/eslint-config-recommended@5.0.0) (2025-06-30)

### Features

- **eslint-config-recommended:** add support for @angular-eslint/\*[@20](https://github.com/20) ([170758a](https://github.com/shiftcode/sc-commons-public/commit/170758a1b030832cbf64f3536f62a783af5cf622))
- **eslint-config-recommended:** update to stable @angular-eslint/\* packages ([eade5ad](https://github.com/shiftcode/sc-commons-public/commit/eade5adc383aa04b014a55fe405dfc412e78695c))

### BREAKING CHANGES

- **eslint-config-recommended:** minimum version of @angular-eslint/\* peer dependencies must be ^20

# [4.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-config-recommended@3.0.0...@shiftcode/eslint-config-recommended@4.0.0) (2025-05-15)

### Features

- **package:** specify node version in the individual packages ([78e01d0](https://github.com/shiftcode/sc-commons-public/commit/78e01d0be016e22584a17e7c021cc1b4408c4d1f))

### BREAKING CHANGES

- **package:** Requires Node 20 or >=22

# [3.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-config-recommended@2.0.1...@shiftcode/eslint-config-recommended@3.0.0) (2025-01-03)

### Build System

- **deps:** upgrade @angular-eslint/\* ([fb1b0b4](https://github.com/shiftcode/sc-commons-public/commit/fb1b0b4161aaf9e23345ed543f598a5a4a79f7ba))

### BREAKING CHANGES

- **deps:** Requires angular 19.

## [2.0.1](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-config-recommended@2.0.0...@shiftcode/eslint-config-recommended@2.0.1) (2024-07-13)

**Note:** Version bump only for package @shiftcode/eslint-config-recommended

# [2.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-config-recommended@1.1.0...@shiftcode/eslint-config-recommended@2.0.0) (2024-07-13)

### Build System

- **deps:** upgrade @angular-eslint/\* ([b7e857e](https://github.com/shiftcode/sc-commons-public/commit/b7e857efe54d49e759d1ad15a69c7ac0fbd7af30)), closes [/github.com/angular-eslint/angular-eslint/blob/main/CHANGELOG.md#1800-2024-05-29](https://github.com//github.com/angular-eslint/angular-eslint/blob/main/CHANGELOG.md/issues/1800-2024-05-29)
- **deps:** upgrade typescript and minimum required node version ([8417ec4](https://github.com/shiftcode/sc-commons-public/commit/8417ec403de6f33fa50caa96692a29c32c186b0e))

### BREAKING CHANGES

- **deps:**
- **deps:** Minimum required node version is 20. In general the runtime (node or browser for utilities) must support es2023.

# 1.1.0 (2024-05-15)

### Features

- **eslint:** added "@typescript-eslint/ban-tslint-comment" rule ([4dc247e](https://github.com/shiftcode/sc-commons-public/commit/4dc247ef980dd8aed8546cab7711818c34c46e4e))
- **eslint:** use new package names ([c037321](https://github.com/shiftcode/sc-commons-public/commit/c037321a5a97cdd66a1d88cf7a482a80116da859))
- **eslint:** use publish-helper script in prepublish ([4984178](https://github.com/shiftcode/sc-commons-public/commit/498417879386b4d1a7a5dcb83995576d270b077a))
- pr improvements ([feab565](https://github.com/shiftcode/sc-commons-public/commit/feab5657bb50fb8a60036b512746e14c51c6aa6a))
- pr improvements ([c056533](https://github.com/shiftcode/sc-commons-public/commit/c056533dae11df88204a3b8c0a9d9ae7bf0c942c))
- **prettier:** over entire project ([ae9754f](https://github.com/shiftcode/sc-commons-public/commit/ae9754fa1267c6f481ef727ba2a8d7dcc0d98f1e))
- **tslint:** remove unused files ([abb2074](https://github.com/shiftcode/sc-commons-public/commit/abb2074c05b363ecff51473eff1a9feacfb534cc))
