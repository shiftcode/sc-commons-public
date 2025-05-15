# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/logger@2.0.0...@shiftcode/logger@3.0.0) (2025-05-15)

### Code Refactoring

- **logger:** rename LoggerService to BaseLoggerService ([66462c5](https://github.com/shiftcode/sc-commons-public/commit/66462c546df6e239dc4e65fc1d083c851d2d0946))

### BREAKING CHANGES

- **logger:** LoggerService was renamed to BaseLoggerService

# [2.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/logger@1.1.0...@shiftcode/logger@2.0.0) (2025-05-15)

### Bug Fixes

- **logger:** add @shiftcode/utilities as devDependency ([def2b0e](https://github.com/shiftcode/sc-commons-public/commit/def2b0ebe1bc0f25fd9719e993657bcc148ed520))

### Features

- **package:** specify node version in the individual packages ([78e01d0](https://github.com/shiftcode/sc-commons-public/commit/78e01d0be016e22584a17e7c021cc1b4408c4d1f))

### BREAKING CHANGES

- **package:** Requires Node 20 or >=22

# 1.1.0 (2025-05-13)

### Bug Fixes

- **logger:** add missing utilities dependency ([abfc35c](https://github.com/shiftcode/sc-commons-public/commit/abfc35c377c9d261e072c4f750b51f99d337625e))
- **logger:** add missing utilities devDependency ([bb93f0f](https://github.com/shiftcode/sc-commons-public/commit/bb93f0ff3abda6afaba98b074e64cd34c2db8689))
- **logger:** add utilities as dependency ([bb82d9c](https://github.com/shiftcode/sc-commons-public/commit/bb82d9cd0b25210c380ffb3670ac14f3bb4f4372))
- **logger:** add utilities in tsconfig path ([659b57b](https://github.com/shiftcode/sc-commons-public/commit/659b57b0eb5bd9376776341ad9d5c81d5586b945))
- **logger:** remove reflect-metadata from jest config ([81bcc45](https://github.com/shiftcode/sc-commons-public/commit/81bcc451f4680301d3287da8d567f2a3f70d30ec))
- **logger:** remove unused ansi-styles dependency ([8d06b79](https://github.com/shiftcode/sc-commons-public/commit/8d06b79226a520711ecb8f0c52afe5c9d3f2e93f))
- **logger:** remove unused utilities dependency ([5f57935](https://github.com/shiftcode/sc-commons-public/commit/5f5793558927c2679c161fce0271f4e8ad8c4b6d))

### Features

- **logger:** add JSON log object creation in JsonLogTransport ([c37f419](https://github.com/shiftcode/sc-commons-public/commit/c37f419e5f55d95a0f78bcd383977dd0bd3d4a87))
- **logger:** add loglevel to transportLog in JsonLogTransport ([670f948](https://github.com/shiftcode/sc-commons-public/commit/670f948701393b23745dbf570ad5de1aca167a21))
- **logger:** new logger detached from inversify ([af9f076](https://github.com/shiftcode/sc-commons-public/commit/af9f0765d4b4147a08612a9951ba658c4d445889))
