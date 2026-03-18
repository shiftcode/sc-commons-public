# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [6.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-plugin-rules@5.0.1...@shiftcode/eslint-plugin-rules@6.0.0) (2026-03-18)

### Bug Fixes

- correct order of export definitions ([1e7ae5c](https://github.com/shiftcode/sc-commons-public/commit/1e7ae5cb84a549589ff673bc4fb06c5770cd9b51))

### Build System

- update supported node version ([85d5fc1](https://github.com/shiftcode/sc-commons-public/commit/85d5fc19d7822abc0e44e07a45258baa95e31482))

### chore

- update Node.js engine requirement to >=24.10.2 and adjust target runtime in documentation ([df497bd](https://github.com/shiftcode/sc-commons-public/commit/df497bd1f776c2ed87feed357838ce1842f5fbba))

### Features

- add `no-spread-array-math` rule ([b0898b0](https://github.com/shiftcode/sc-commons-public/commit/b0898b0c3e50b0a3ef98328eaf439826973b7b39))

### BREAKING CHANGES

- - node@v24 runtime requires
- require node >= 22.10.2

## [5.0.1](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-plugin-rules@5.0.0...@shiftcode/eslint-plugin-rules@5.0.1) (2025-11-06)

**Note:** Version bump only for package @shiftcode/eslint-plugin-rules

# [5.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-plugin-rules@4.0.1...@shiftcode/eslint-plugin-rules@5.0.0) (2025-11-04)

### Bug Fixes

- **src:** make imports type:module compatible ([0534ac0](https://github.com/shiftcode/sc-commons-public/commit/0534ac01e630bfe54f75f91fdc8eec06eb8e73b8))

### Documentation

- **readme:** eslint v9.37 ([0b2340c](https://github.com/shiftcode/sc-commons-public/commit/0b2340caccf1aa192852e5d1062ba4cb0f1f95ca))

### Features

- replace cjs to mjs files ([de2580a](https://github.com/shiftcode/sc-commons-public/commit/de2580a2b0e8a8da97ac3a0ca884e5467ba91237))

### BREAKING CHANGES

- **readme:** - no eslint ^9.37 is required

* sc config is applied by using the exposed functions
* sc rules shall be used with recommended config

## [4.0.1](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-plugin-rules@4.0.0...@shiftcode/eslint-plugin-rules@4.0.1) (2025-09-09)

**Note:** Version bump only for package @shiftcode/eslint-plugin-rules

# [4.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-plugin-rules@3.0.0...@shiftcode/eslint-plugin-rules@4.0.0) (2025-05-15)

### Features

- **package:** specify node version in the individual packages ([78e01d0](https://github.com/shiftcode/sc-commons-public/commit/78e01d0be016e22584a17e7c021cc1b4408c4d1f))

### BREAKING CHANGES

- **package:** Requires Node 20 or >=22

# [3.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-plugin-rules@2.0.1...@shiftcode/eslint-plugin-rules@3.0.0) (2025-01-03)

### Build System

- **deps:** upgrade @angular-eslint/\* ([fb1b0b4](https://github.com/shiftcode/sc-commons-public/commit/fb1b0b4161aaf9e23345ed543f598a5a4a79f7ba))

### BREAKING CHANGES

- **deps:** Requires angular 19.

## [2.0.1](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-plugin-rules@2.0.0...@shiftcode/eslint-plugin-rules@2.0.1) (2024-07-13)

**Note:** Version bump only for package @shiftcode/eslint-plugin-rules

# [2.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/eslint-plugin-rules@1.1.0...@shiftcode/eslint-plugin-rules@2.0.0) (2024-07-13)

### Build System

- **deps:** upgrade typescript and minimum required node version ([8417ec4](https://github.com/shiftcode/sc-commons-public/commit/8417ec403de6f33fa50caa96692a29c32c186b0e))

### BREAKING CHANGES

- **deps:** Minimum required node version is 20. In general the runtime (node or browser for utilities) must support es2023.

# 1.1.0 (2024-05-15)

### Features

- **eslint:** added "@typescript-eslint/ban-tslint-comment" rule ([4dc247e](https://github.com/shiftcode/sc-commons-public/commit/4dc247ef980dd8aed8546cab7711818c34c46e4e))
- **eslint:** use new package names ([c037321](https://github.com/shiftcode/sc-commons-public/commit/c037321a5a97cdd66a1d88cf7a482a80116da859))
- **eslint:** use publish-helper script in prepublish ([4984178](https://github.com/shiftcode/sc-commons-public/commit/498417879386b4d1a7a5dcb83995576d270b077a))
- pr improvements ([feab565](https://github.com/shiftcode/sc-commons-public/commit/feab5657bb50fb8a60036b512746e14c51c6aa6a))
- **tslint:** remove unused files ([abb2074](https://github.com/shiftcode/sc-commons-public/commit/abb2074c05b363ecff51473eff1a9feacfb534cc))
