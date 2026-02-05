# lambda-utils

> 🎯 Target runtime: es2023 ([Node >= 20](https://node.green/#ES2023))

This package contains some utils for lambda functions.

## services (deep-import)

- require the following peer dependencies (when used):
  - `reflect-metadata`
  - `inversify`
  - `aws-sdk`
  - `@shiftcode/logger`
  - `@shiftcode/logger-inversify`

* [S3Helper](./src/s3/s3-helper.service.ts) import from `@shiftcode/lambda-utils/s3`
  - requires LoggerService (`@shiftcode/logger-inversify`), Logger(`@shiftcode/logger`) & `inversify` to be provided
  - provides `init` function which needs to be called first `s3Helper.init('bucket')`
