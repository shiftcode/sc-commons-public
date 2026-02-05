# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [13.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@12.0.0...@shiftcode/lambda-utils@13.0.0) (2026-01-14)

### Bug Fixes

- **lambda-utils:** resolve non-retryable stream error ([72cee2b](https://github.com/shiftcode/sc-commons/commit/72cee2b66aad6afc91bdf93184f76adfec420dd5))

### BREAKING CHANGES

- **lambda-utils:** The return types for the public functions downloadJson / readStream and readStreamDownload now also include undefined

# [12.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@11.0.1...@shiftcode/lambda-utils@12.0.0) (2025-05-19)

### Bug Fixes

- **lambda-utils:** add @shiftcode/logger-inversify as optional peer-dependency ([2a5aca5](https://github.com/shiftcode/sc-commons/commit/2a5aca5413b5857010e1cddd3908de7f7134c35f))

### Features

- **lambda-utils:** replace @shiftcode/lambda-logger with @shiftcode/logger ([40396e9](https://github.com/shiftcode/sc-commons/commit/40396e9526ebd7491f800c059294ef2f2772953c))
- update @shiftcode/logger to version ^3.0.0 and @shiftcode/utilities to version ^4.0.0 ([2e5f2d1](https://github.com/shiftcode/sc-commons/commit/2e5f2d1a78882b8885aacd7bab56b8733a13b7d6))

### BREAKING CHANGES

- requires @shiftcode/logger ^3.0.0,
  requires @shiftcode/utilities ^4.0.0

## [11.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@11.0.0...@shiftcode/lambda-utils@11.0.1) (2025-05-15)

**Note:** Version bump only for package @shiftcode/lambda-utils

# [11.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@10.3.3...@shiftcode/lambda-utils@11.0.0) (2025-05-01)

### Bug Fixes

- **lambda-utils:** replace Logger with injectable token LoggerService ([d3b3f2f](https://github.com/shiftcode/sc-commons/commit/d3b3f2f472d77f02fef3ce7337b47596e719c649))

### Features

- update to inversify^7.0.0 ([c6807d6](https://github.com/shiftcode/sc-commons/commit/c6807d6c21110c820f489020d41c1cbad3a2b2f6))

### BREAKING CHANGES

- requires inversify^7.0.0 as a peer dependency

## [10.3.3](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@10.3.2...@shiftcode/lambda-utils@10.3.3) (2025-03-06)

### Bug Fixes

- update engines definition (left over from node 22 upgrade) ([f5428ae](https://github.com/shiftcode/sc-commons/commit/f5428ae64c45567912887b8bab1e881c4312669f))
- update version range for reflect-metadata ([9b7b0d1](https://github.com/shiftcode/sc-commons/commit/9b7b0d1056a9f47476e1ddb1ac58335094e2185f))

## [10.3.2](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@10.3.1...@shiftcode/lambda-utils@10.3.2) (2025-03-04)

**Note:** Version bump only for package @shiftcode/lambda-utils

## [10.3.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@10.3.0...@shiftcode/lambda-utils@10.3.1) (2024-08-02)

**Note:** Version bump only for package @shiftcode/lambda-utils

# [10.3.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@10.2.0...@shiftcode/lambda-utils@10.3.0) (2024-07-31)

### Features

- move start indication log to lambda-utils ([f88359e](https://github.com/shiftcode/sc-commons/commit/f88359e692fce5aaaee7ebc57d22eb22051a2923))

# [10.2.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@10.1.0...@shiftcode/lambda-utils@10.2.0) (2024-07-30)

### Bug Fixes

- **airtable-sync:** implement real batching ([62c02cc](https://github.com/shiftcode/sc-commons/commit/62c02cca0b937a181eded643ab29ca9a6e5a389a))

### Features

- **exponential-backoff:** log success only when retried before ([56a9f98](https://github.com/shiftcode/sc-commons/commit/56a9f986b381fba691934cccda7c25aa4d63ba6c))
- **s3-helper:** add retry with backoff ([63269ff](https://github.com/shiftcode/sc-commons/commit/63269ff0475c941cbd812336db0a8374f9e6450c))
- **s3-helper:** move execute with backoff to static helper function ([1e449b6](https://github.com/shiftcode/sc-commons/commit/1e449b6b382239fb01dceedcf3a5e3206f02892e))
- **s3-helper:** undo unnecessary line ([e40726e](https://github.com/shiftcode/sc-commons/commit/e40726e353cc8b9c075dc6657ee0afe7c9046983))

# [10.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@10.0.0...@shiftcode/lambda-utils@10.1.0) (2024-07-29)

### Features

- **lambda-utils:** added comment about using the method outside of the lambda handler method ([f56e398](https://github.com/shiftcode/sc-commons/commit/f56e398f6b7823666ccfa8ee606015eb18a2b1b6))
- **lambda-utils:** added helper method to fetch ssm string param via lambda layer ([2b1fb6d](https://github.com/shiftcode/sc-commons/commit/2b1fb6d44050a6e01ed90472455c7d040999b26f))
- **lambda-utils:** feedback from PR review ([40e31b0](https://github.com/shiftcode/sc-commons/commit/40e31b023e8bc44b40a5cef796bc6af4b14d383c))

# [10.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@9.0.3...@shiftcode/lambda-utils@10.0.0) (2024-07-13)

### Bug Fixes

- **lambda-utils:** add correct peer dependencies ([4d011db](https://github.com/shiftcode/sc-commons/commit/4d011dbf47434f92f6aba0e40490097de1e12433))

### Build System

- **node:** upgrade to node 20 ([2899d0d](https://github.com/shiftcode/sc-commons/commit/2899d0d41ece080b276e7bf84915d4849da81a29))

### BREAKING CHANGES

- **node:** Minimum required node version is 20.11.1. In general speaking the runtime (Node or Browser) must support all es2023 features.

## [9.0.3](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@9.0.2...@shiftcode/lambda-utils@9.0.3) (2024-01-25)

### Bug Fixes

- **lambda-utils:** collect all chunks when downloading ([1d56ddb](https://github.com/shiftcode/sc-commons/commit/1d56ddb71e17264b1d605dd763b1497b5372c081))

## [9.0.2](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@9.0.1...@shiftcode/lambda-utils@9.0.2) (2023-10-18)

**Note:** Version bump only for package @shiftcode/lambda-utils

## [9.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@9.0.0...@shiftcode/lambda-utils@9.0.1) (2023-07-27)

**Note:** Version bump only for package @shiftcode/lambda-utils

# [9.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@8.1.0...@shiftcode/lambda-utils@9.0.0) (2023-05-15)

### Code Refactoring

- **lambda-utils:** remove depreacted functionality ([39dcfd1](https://github.com/shiftcode/sc-commons/commit/39dcfd1e350bb0d2a04b6bf2cabc41f69f3de781))

### Features

- **lambda-utils:** migrate to ESM ([2b034a8](https://github.com/shiftcode/sc-commons/commit/2b034a8eaf5b166000da4551b7f50969cb2c6292))
- **lambda-utils:** migrate to ESM (different related changes) ([590ee1e](https://github.com/shiftcode/sc-commons/commit/590ee1ef63955d9bc6b2902af2aa3988e31e479e))
- **s3-helper:** added helper method to work directly with stream when reading file ([e22e279](https://github.com/shiftcode/sc-commons/commit/e22e279a3e9e0025eaf5d31065704861f845ce53))

### BREAKING CHANGES

- **lambda-utils:** sns related functionality was removed with no replacement (didn't add any value)
- **lambda-utils:** only supported in projects using ESM
- **lambda-utils:** only supported in projects using ESM

# [8.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@8.0.0...@shiftcode/lambda-utils@8.1.0) (2023-03-17)

### Features

- **eslint-plugin:** introduce tests to verify correct implementation of plugins ([76d5b2f](https://github.com/shiftcode/sc-commons/commit/76d5b2f2bea5a3f4450e7ce43153fc2ddba832c1))

# [8.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@7.0.0...@shiftcode/lambda-utils@8.0.0) (2023-03-16)

### Build System

- **tsconfig:** build for es2022 target ([c75651b](https://github.com/shiftcode/sc-commons/commit/c75651b2b2ca6338e71b6538616d5b0e9bbb40cc))

### Code Refactoring

- **lambda-utils:** use aws-sdk v3 libs for s3/sns utils ([be7acc3](https://github.com/shiftcode/sc-commons/commit/be7acc3aa592dbba091e54a1894ff957ca2e5834))

### BREAKING CHANGES

- **tsconfig:** requires ES2022 support (node@18)
- **lambda-utils:** requires @aws-sdk/client-sns^3.204.0, @aws-sdk/client-s3^3.204.0 respectively

# [7.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@6.0.0...@shiftcode/lambda-utils@7.0.0) (2022-01-17)

### Bug Fixes

- **exports:** remove service exports from index to make peer dependencies actually optional ([f6c6662](https://github.com/shiftcode/sc-commons/commit/f6c6662c5b19af1061331add6d4718a4deb1ced2))
- **peerDependencies:** make `@shiftcode/utilities` non-optional ([237d1b8](https://github.com/shiftcode/sc-commons/commit/237d1b80a4a7c10ca643ef6af4109adc6ee2ea18))

### BREAKING CHANGES

- **peerDependencies:** `@shiftcode/utilities` is now required peer dependency
- **exports:** use services with deep imports

## 6.0.0 (2022-01-11)

- build(release): next version [skip ci] ([7fb99e3](https://github.com/shiftcode/sc-commons/commit/7fb99e3))
- build(release): next version [skip ci] ([69f8e36](https://github.com/shiftcode/sc-commons/commit/69f8e36))
- build(release): next version [skip ci] ([6658958](https://github.com/shiftcode/sc-commons/commit/6658958))
- build(release): next version [skip_build] ([911da02](https://github.com/shiftcode/sc-commons/commit/911da02))
- build(release): next version [skip_build] ([199066e](https://github.com/shiftcode/sc-commons/commit/199066e))
- build(release): next version [skip_build] ([0c839e4](https://github.com/shiftcode/sc-commons/commit/0c839e4))
- build(release): next version [skip_build] ([2722982](https://github.com/shiftcode/sc-commons/commit/2722982))
- build(release): next version [skip_build] ([a0e996a](https://github.com/shiftcode/sc-commons/commit/a0e996a))
- build(release): next version [skip_build] ([8d72402](https://github.com/shiftcode/sc-commons/commit/8d72402))
- build(release): next version [skip_build] ([7bca45d](https://github.com/shiftcode/sc-commons/commit/7bca45d))
- build(release): next version [skip_build] ([82c65ba](https://github.com/shiftcode/sc-commons/commit/82c65ba))
- build(release): next version [skip_build] ([8589cd3](https://github.com/shiftcode/sc-commons/commit/8589cd3))
- build(release): next version [skip_build] ([aaebf67](https://github.com/shiftcode/sc-commons/commit/aaebf67))
- build(release): next version [skip_build] ([e38c9a6](https://github.com/shiftcode/sc-commons/commit/e38c9a6))
- build(release): next version [skip_build] ([9470e94](https://github.com/shiftcode/sc-commons/commit/9470e94))
- build(release): next version [skip_build] ([7a83884](https://github.com/shiftcode/sc-commons/commit/7a83884))
- build(release): next version [skip_build] ([0ca65a3](https://github.com/shiftcode/sc-commons/commit/0ca65a3))
- build(release): next version [skip_build] ([b9614a4](https://github.com/shiftcode/sc-commons/commit/b9614a4))
- build(release): next version [skip_build] ([1483216](https://github.com/shiftcode/sc-commons/commit/1483216))
- build(release): next version [skip_build] ([5e2b455](https://github.com/shiftcode/sc-commons/commit/5e2b455))
- build(release): next version [skip_build] ([7470c7d](https://github.com/shiftcode/sc-commons/commit/7470c7d))
- build(release): next version [skip_build] ([bf316bd](https://github.com/shiftcode/sc-commons/commit/bf316bd))
- build(release): next version [skip_workflow] ([04eb9bc](https://github.com/shiftcode/sc-commons/commit/04eb9bc))
- build(scripts): use rm -rf instead of rimraf ([de45957](https://github.com/shiftcode/sc-commons/commit/de45957))
- chore(aws-sdk): use same version in all packages ([08ac152](https://github.com/shiftcode/sc-commons/commit/08ac152))
- chore(deps): update ([ef20963](https://github.com/shiftcode/sc-commons/commit/ef20963))
- chore(jest.config): fix import of utils ([29cab2c](https://github.com/shiftcode/sc-commons/commit/29cab2c))
- chore(peer-deps): remove pr version ([ef34bce](https://github.com/shiftcode/sc-commons/commit/ef34bce))
- refactor(peer-dependencies): use utilities lib from sc-commons-public ([2b3a142](https://github.com/shiftcode/sc-commons/commit/2b3a142))
- fix(peer-dependencies): correct version ([99aa21e](https://github.com/shiftcode/sc-commons/commit/99aa21e))
- fix(peer-dependencies): make all optional ([735744a](https://github.com/shiftcode/sc-commons/commit/735744a))
- fix(peer-dependencies): update versions ([9aac1ed](https://github.com/shiftcode/sc-commons/commit/9aac1ed))
- feat(deps): update dependencies ([ce9c2d5](https://github.com/shiftcode/sc-commons/commit/ce9c2d5))

### BREAKING CHANGE

- inversify@^6.0.1 required

## 5.0.0 (2021-12-23)

- build(release): next version [skip ci] ([d3b33ba](https://github.com/shiftcode/sc-commons/commit/d3b33ba))
- build(release): next version [skip ci] ([87c30b4](https://github.com/shiftcode/sc-commons/commit/87c30b4))
- build(release): next version [skip ci] ([16d5995](https://github.com/shiftcode/sc-commons/commit/16d5995))
- build(release): next version [skip ci] ([d7b6d61](https://github.com/shiftcode/sc-commons/commit/d7b6d61))
- build(release): next version [skip ci] ([76a41a6](https://github.com/shiftcode/sc-commons/commit/76a41a6))
- build(release): next version [skip ci] ([44d8085](https://github.com/shiftcode/sc-commons/commit/44d8085))
- build(release): next version [skip ci] ([4a2a73d](https://github.com/shiftcode/sc-commons/commit/4a2a73d))
- build(release): next version [skip ci] ([ac3ac7f](https://github.com/shiftcode/sc-commons/commit/ac3ac7f))
- build(release): next version [skip ci] ([14622a2](https://github.com/shiftcode/sc-commons/commit/14622a2))
- build(release): next version [skip ci] ([3199b0c](https://github.com/shiftcode/sc-commons/commit/3199b0c))
- build(release): next version [skip ci] ([652b10b](https://github.com/shiftcode/sc-commons/commit/652b10b))
- build(release): next version [skip ci] ([78e4b60](https://github.com/shiftcode/sc-commons/commit/78e4b60))
- build(release): next version [skip ci] ([006c0be](https://github.com/shiftcode/sc-commons/commit/006c0be))
- build(release): next version [skip ci] ([6285743](https://github.com/shiftcode/sc-commons/commit/6285743))
- build(release): next version [skip ci] ([2e01006](https://github.com/shiftcode/sc-commons/commit/2e01006))
- build(release): next version [skip ci] ([f66b3c3](https://github.com/shiftcode/sc-commons/commit/f66b3c3))
- build(release): next version [skip ci] ([69cc0f4](https://github.com/shiftcode/sc-commons/commit/69cc0f4))
- build(release): next version [skip ci] ([921f9f0](https://github.com/shiftcode/sc-commons/commit/921f9f0))
- build(release): next version [skip ci] ([25993ec](https://github.com/shiftcode/sc-commons/commit/25993ec))
- build(release): next version [skip ci] ([1fed9a1](https://github.com/shiftcode/sc-commons/commit/1fed9a1))
- build(release): next version [skip ci] ([cd44cac](https://github.com/shiftcode/sc-commons/commit/cd44cac))
- refactor(\*): replace npm run with yarn ([238adbc](https://github.com/shiftcode/sc-commons/commit/238adbc))
- refactor(\*): replace yarn run with yarn ([ef0d2f7](https://github.com/shiftcode/sc-commons/commit/ef0d2f7))
- refactor(\*): unify READMEs title ([b779764](https://github.com/shiftcode/sc-commons/commit/b779764))
- revert(version): back to pr ([daf8058](https://github.com/shiftcode/sc-commons/commit/daf8058))
- fix(package.json): author ([67db3f3](https://github.com/shiftcode/sc-commons/commit/67db3f3))
- fix(package.json): set sideEffects property ([0d119cc](https://github.com/shiftcode/sc-commons/commit/0d119cc))
- fix(peer-dependencies): depend on pr93 versions ([b36c70b](https://github.com/shiftcode/sc-commons/commit/b36c70b))
- feat(http-response): add noContent static method ([7b4c822](https://github.com/shiftcode/sc-commons/commit/7b4c822))
- feat(http-response): add xml static method ([9000b36](https://github.com/shiftcode/sc-commons/commit/9000b36))
- feat(typescript): use typescript 4.4 and require tslib ^2.3 ([3524ecd](https://github.com/shiftcode/sc-commons/commit/3524ecd))
- style(prettier): update to 2.5 and prettify ([47be5f1](https://github.com/shiftcode/sc-commons/commit/47be5f1))
- test(jest): update rename tsconfig.spec and update jest ([30a28ff](https://github.com/shiftcode/sc-commons/commit/30a28ff))

### BREAKING CHANGE

- requires tslib ^2.3

## 4.1.0 (2021-11-09)

- fix(lambda-utils): aws version & linting settings ([80d8a19](https://github.com/shiftcode/sc-commons/commit/80d8a19))
- fix(lambda-utils): fix dev dependencies version ([e44f76e](https://github.com/shiftcode/sc-commons/commit/e44f76e))
- feat(lambda-utils): added HttpResponse ([f9b9935](https://github.com/shiftcode/sc-commons/commit/f9b9935))

## <small>4.0.2 (2021-11-08)</small>

**Note:** Version bump only for package @shiftcode/lambda-utils

## <small>4.0.1 (2021-01-22)</small>

**Note:** Version bump only for package @shiftcode/lambda-utils

## 4.0.0 (2020-10-06)

- Merge branch 'master' into #77-reusable-utils ([baa4f26](https://github.com/shiftcode/sc-commons/commit/baa4f26)), closes [#77](https://github.com/shiftcode/sc-commons/issues/77)
- chore(lint-staged): update all configuration files ([ac86637](https://github.com/shiftcode/sc-commons/commit/ac86637))
- refactor(s3-helper): rename method ([3c2a04c](https://github.com/shiftcode/sc-commons/commit/3c2a04c))
- fix(s3-helper): uploadDataJson, make upload public ([051e3ca](https://github.com/shiftcode/sc-commons/commit/051e3ca))

### BREAKING CHANGE

- - s3Helper method uploadDataJson renamed to uploadJson()

## <small>3.0.2 (2020-06-14)</small>

- fix(lambda-utils): move aws-sdk to peer deps from prod dep ([2d82dfb](https://github.com/shiftcode/sc-commons/commit/2d82dfb))

## <small>3.0.1 (2020-05-19)</small>

- fix(peerdeps): version of peer deps update ([9dd641d](https://github.com/shiftcode/sc-commons/commit/9dd641d))

## 3.0.0 (2020-05-19)

- feat(typescript): update to typescript 3.9 ([1dc45f5](https://github.com/shiftcode/sc-commons/commit/1dc45f5))

### BREAKING CHANGE

- tslib 2.0.0 required for typescript update

## <small>2.0.7 (2020-05-09)</small>

**Note:** Version bump only for package @shiftcode/lambda-utils

## <small>2.0.6 (2020-04-09)</small>

- style(prettier): prettify all files ([a9552d0](https://github.com/shiftcode/sc-commons/commit/a9552d0))

## <small>2.0.5 (2019-12-04)</small>

- chore(deps): bumb a few dev dependencies ([16781af](https://github.com/shiftcode/sc-commons/commit/16781af))

## <small>2.0.4 (2019-12-04)</small>

**Note:** Version bump only for package @shiftcode/lambda-utils

## <small>2.0.3 (2019-12-04)</small>

- chore(ts-config): activate the esModuleInterop flag and refactor imports ([25625df](https://github.com/shiftcode/sc-commons/commit/25625df))
- build(\*): update tsconfig and doc ([71c35a8](https://github.com/shiftcode/sc-commons/commit/71c35a8))
- build(tsconfig): remove unnecesarry lib declaration ([9894dc1](https://github.com/shiftcode/sc-commons/commit/9894dc1))
- build(yarn): migrate to yarn workspace ([8811814](https://github.com/shiftcode/sc-commons/commit/8811814))

## <small>2.0.2 (2019-11-14)</small>

- fix(lambda-utils): lower aws-sdk dependency ([c3f8862](https://github.com/shiftcode/sc-commons/commit/c3f8862))

## [2.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/lambda-utils@2.0.0...@shiftcode/lambda-utils@2.0.1) (2019-11-07)

**Note:** Version bump only for package @shiftcode/lambda-utils

# [2.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcoders/lambda-utils@1.1.1...@shiftcoders/lambda-utils@2.0.0) (2019-10-24)

### Bug Fixes

- **airtable-sync:** remove super verbose logs ([3754e57](https://github.com/shiftcode/sc-commons/commit/3754e57721ded586543c86df1660bb0f4a92a3a4))

### Code Refactoring

- **airtable:** fix stuff, split into 2 packages ([345f57b](https://github.com/shiftcode/sc-commons/commit/345f57bc86f2cd587b9da1a521cc724b3eb9d6f2))

### BREAKING CHANGES

- **airtable:** - two packages

## [1.1.1](https://github.com/shiftcode/sc-commons/compare/@shiftcoders/lambda-utils@1.1.0...@shiftcoders/lambda-utils@1.1.1) (2019-10-16)

**Note:** Version bump only for package @shiftcoders/lambda-utils

# 1.1.0 (2019-10-11)

### Features

- **lambda-utils:** new package with utils for lambdas ([c0b3d6a](https://github.com/shiftcode/sc-commons/commit/c0b3d6a13397da988113c5f64a80510625db1e73))
