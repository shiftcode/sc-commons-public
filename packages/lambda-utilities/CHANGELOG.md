# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2026-03-18)

### Bug Fixes

- deep exports from ssm and s3 ([876fd77](https://github.com/shiftcode/sc-commons-public/commit/876fd7707a5583e4fc8e11b7a86470b9c37b7368))
- **fetch-ssm-string-param-value:** add error handling for non-OK responses ([58430c2](https://github.com/shiftcode/sc-commons-public/commit/58430c20c98ecb95645ce0acaa7706322227c432))

### Build System

- update supported node version ([85d5fc1](https://github.com/shiftcode/sc-commons-public/commit/85d5fc19d7822abc0e44e07a45258baa95e31482))

### chore

- update Node.js engine requirement to >=24.10.2 and adjust target runtime in documentation ([df497bd](https://github.com/shiftcode/sc-commons-public/commit/df497bd1f776c2ed87feed357838ce1842f5fbba))

### Features

- introduce lambda-utilities ([25d3c81](https://github.com/shiftcode/sc-commons-public/commit/25d3c81f42613aaf5d771f91a6b4ead4ac07f60b))

### BREAKING CHANGES

- - node@v24 runtime requires
- - `fetchSsmStringParamValue` now exported from `@shiftcode/lambda-utilities/ssm`

* `S3Helper` now exported from `@shiftcode/lambda-utilities/s3`

- require node >= 22.10.2
