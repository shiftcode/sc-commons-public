# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [12.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@12.0.2...@shiftcode/airtable-sync@12.1.0) (2026-01-14)

### Bug Fixes

- **airtable-sync:** throw underlying error instead of misleading error ([66e9a3c](https://github.com/shiftcode/sc-commons/commit/66e9a3c64d2838664e4545e4f0a6bff8b4bfc622))

### Features

- **airtable-sync:** reduce concurrent s3 uploads from 500 to 50 ([b6d184a](https://github.com/shiftcode/sc-commons/commit/b6d184a5e93440e6434e60e431085ebb8c22b9ee))

## [12.0.2](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@12.0.1...@shiftcode/airtable-sync@12.0.2) (2026-01-09)

### Bug Fixes

- **airtable-sync:** add try catch for sns sending ([5ea001d](https://github.com/shiftcode/sc-commons/commit/5ea001ddf1d6e9ae5188337b3af610a0c87cd03a))
- **airtable-sync:** make sure throttle does not drop calls ([a586d73](https://github.com/shiftcode/sc-commons/commit/a586d737a43935ac6723f50976a33e906e16f123))

## [12.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@12.0.0...@shiftcode/airtable-sync@12.0.1) (2025-05-23)

### Bug Fixes

- **airtable-sync:** resolve typing issues with the new airtable version ([7b20082](https://github.com/shiftcode/sc-commons/commit/7b200828cfa19507dca100d427e030e8feb63d1d))
- **airtable-sync:** update airtable dep to get rid of outdated libs downstream ([7e72159](https://github.com/shiftcode/sc-commons/commit/7e72159ca32fb582c27a58cfcba2e70c6ec6e055))

# [12.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@11.0.1...@shiftcode/airtable-sync@12.0.0) (2025-05-19)

### Features

- **airtable-sync:** replace @shiftcode/lambda-logger with @shiftcode/logger ([a121d36](https://github.com/shiftcode/sc-commons/commit/a121d360bc16c275a153c5df9cdf70c80971384d))
- update @shiftcode/logger to version ^3.0.0 and @shiftcode/utilities to version ^4.0.0 ([2e5f2d1](https://github.com/shiftcode/sc-commons/commit/2e5f2d1a78882b8885aacd7bab56b8733a13b7d6))

### BREAKING CHANGES

- requires @shiftcode/logger ^3.0.0,
  requires @shiftcode/utilities ^4.0.0

## [11.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@11.0.0...@shiftcode/airtable-sync@11.0.1) (2025-05-15)

**Note:** Version bump only for package @shiftcode/airtable-sync

# [11.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@10.2.3...@shiftcode/airtable-sync@11.0.0) (2025-05-01)

### Bug Fixes

- **airtable-sync:** replace Logger with injectable token LoggerService ([2967875](https://github.com/shiftcode/sc-commons/commit/2967875ec44be12a790464b2e0bca108b2d84254))
- **airtable-sync:** resolve issues related to inversify^7.0.0 update ([a7d3d49](https://github.com/shiftcode/sc-commons/commit/a7d3d49be99434a78b135f5b835dd38c8008e586))

### Features

- **airtable-sync:** change how the config is provided ([ca9ed7a](https://github.com/shiftcode/sc-commons/commit/ca9ed7ae9aa05fffa63be2beeadcda6e3705d2c7))
- **airtable-sync:** update to date-fns^4.0.0 ([d554600](https://github.com/shiftcode/sc-commons/commit/d55460037834c20edda1816d02de55fe7c744394))
- update to inversify^7.0.0 ([c6807d6](https://github.com/shiftcode/sc-commons/commit/c6807d6c21110c820f489020d41c1cbad3a2b2f6))

### BREAKING CHANGES

- **airtable-sync:** The configuration for airtable-sync must now be provided using a dedicated inversify symbol (AIRTABLE_SYNC_CONFIG) and config type (AirtableSyncConfig)
- requires inversify^7.0.0 as a peer dependency
- **airtable-sync:** requires date-fns^4.0.0 as a peer dependency

## [10.2.3](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@10.2.2...@shiftcode/airtable-sync@10.2.3) (2025-03-06)

### Bug Fixes

- update engines definition (left over from node 22 upgrade) ([f5428ae](https://github.com/shiftcode/sc-commons/commit/f5428ae64c45567912887b8bab1e881c4312669f))
- update version range for reflect-metadata ([9b7b0d1](https://github.com/shiftcode/sc-commons/commit/9b7b0d1056a9f47476e1ddb1ac58335094e2185f))

## [10.2.2](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@10.2.1...@shiftcode/airtable-sync@10.2.2) (2025-03-04)

**Note:** Version bump only for package @shiftcode/airtable-sync

## [10.2.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@10.2.0...@shiftcode/airtable-sync@10.2.1) (2024-08-02)

### Bug Fixes

- **airtable-sync:** fix issue with unwrapped results ([43800f0](https://github.com/shiftcode/sc-commons/commit/43800f0201ed29403111909c370468648b18dc18))

# [10.2.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@10.1.0...@shiftcode/airtable-sync@10.2.0) (2024-07-31)

### Features

- move start indication log to lambda-utils ([f88359e](https://github.com/shiftcode/sc-commons/commit/f88359e692fce5aaaee7ebc57d22eb22051a2923))

# [10.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@10.0.1...@shiftcode/airtable-sync@10.1.0) (2024-07-30)

### Bug Fixes

- **airtable-sync:** fix typo ([2296176](https://github.com/shiftcode/sc-commons/commit/22961763a636f2cbb5d1be28ebe291c291e6da15))
- **airtable-sync:** implement real batching ([62c02cc](https://github.com/shiftcode/sc-commons/commit/62c02cca0b937a181eded643ab29ca9a6e5a389a))
- **airtable-sync:** import path ([236bfe8](https://github.com/shiftcode/sc-commons/commit/236bfe86cf10837d27a6220283f81e7e16bcf1f0))
- **airtable-sync:** move batch execution to correct place ([302b474](https://github.com/shiftcode/sc-commons/commit/302b474342d3b95d5d40e2a8571959c57fcfe961))

### Features

- **airtable-sync:** split upload into chunks ([19bf084](https://github.com/shiftcode/sc-commons/commit/19bf08484b073ae8d82556ee9e57ea4e6e3304f8))
- **batch-executor:** use generator ([739ade7](https://github.com/shiftcode/sc-commons/commit/739ade717711168830c87b079df70ff8ce59c3e6))
- **batch-executor:** use settled ([7895295](https://github.com/shiftcode/sc-commons/commit/78952950e40108f786537ecde212d8261d022427))

## [10.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@10.0.0...@shiftcode/airtable-sync@10.0.1) (2024-07-29)

**Note:** Version bump only for package @shiftcode/airtable-sync

# [10.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@9.0.0...@shiftcode/airtable-sync@10.0.0) (2024-07-13)

### Build System

- **airtable-sync:** upgrade date-fns ([9403c78](https://github.com/shiftcode/sc-commons/commit/9403c7837b13c24e46ef4fb8121f3bb6c1d8b0b1))
- **node:** upgrade to node 20 ([2899d0d](https://github.com/shiftcode/sc-commons/commit/2899d0d41ece080b276e7bf84915d4849da81a29))

### Reverts

- Revert "build(airtable-sync): upgrade airtable dependency" ([35403a9](https://github.com/shiftcode/sc-commons/commit/35403a93bc7a00a489eb5430d15f16e4a5384904))

### BREAKING CHANGES

- **airtable-sync:** minimum version date-fns@^3.0.0 is required as peer dependency
- **node:** Minimum required node version is 20.11.1. In general speaking the runtime (Node or Browser) must support all es2023 features.

# [9.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@8.0.6...@shiftcode/airtable-sync@9.0.0) (2024-07-08)

### Features

- **airtable-mapping:** remove obsolete constructor argument ([a528743](https://github.com/shiftcode/sc-commons/commit/a5287436ba0913c61122b0c8a330856a741cd0d5))

### BREAKING CHANGES

- **airtable-mapping:** The AirtableMapping constructor does no longer accept two arguments. Instead we assume the modelName and tableName are equal.

## [8.0.6](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@8.0.5...@shiftcode/airtable-sync@8.0.6) (2024-01-25)

**Note:** Version bump only for package @shiftcode/airtable-sync

## [8.0.5](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@8.0.4...@shiftcode/airtable-sync@8.0.5) (2023-12-18)

**Note:** Version bump only for package @shiftcode/airtable-sync

## [8.0.4](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@8.0.3...@shiftcode/airtable-sync@8.0.4) (2023-10-18)

**Note:** Version bump only for package @shiftcode/airtable-sync

## [8.0.3](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@8.0.2...@shiftcode/airtable-sync@8.0.3) (2023-07-27)

### Bug Fixes

- **airtable-sync:** add support for version deployed in lambda runtime (node18) ([b2be98d](https://github.com/shiftcode/sc-commons/commit/b2be98dfde69d9e5ff1d55fee5e7fde058c46c69))
- **airtable-sync:** use Promise.allSettled and await in smaller batches ([e4611fc](https://github.com/shiftcode/sc-commons/commit/e4611fc385a9007afbe3d5534979b031139c39a3))
- **airtable-sync:** use symbol to identify KeyValue mapping ([541d794](https://github.com/shiftcode/sc-commons/commit/541d79467e685d655490d2cf465b2add9662a482))

## [8.0.2](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@8.0.1...@shiftcode/airtable-sync@8.0.2) (2023-06-01)

**Note:** Version bump only for package @shiftcode/airtable-sync

## [8.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@8.0.0...@shiftcode/airtable-sync@8.0.1) (2023-06-01)

**Note:** Version bump only for package @shiftcode/airtable-sync

# [8.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@7.1.0...@shiftcode/airtable-sync@8.0.0) (2023-05-15)

### Features

- **airtable-sync:** inline sns publisher functionality ([080a1e2](https://github.com/shiftcode/sc-commons/commit/080a1e24a4d0991e9e2be4b433b1c759cc197364))
- **airtable-sync:** migrate to ESM (different related changes) ([8593e0a](https://github.com/shiftcode/sc-commons/commit/8593e0a8eb4da2bf3734c1ee02024be1ca2d7ec1))

### BREAKING CHANGES

- **airtable-sync:** only supported in projects using ESM

# [7.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@7.0.0...@shiftcode/airtable-sync@7.1.0) (2023-03-17)

### Features

- **eslint-plugin:** introduce tests to verify correct implementation of plugins ([76d5b2f](https://github.com/shiftcode/sc-commons/commit/76d5b2f2bea5a3f4450e7ce43153fc2ddba832c1))

# [7.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@6.0.1...@shiftcode/airtable-sync@7.0.0) (2023-03-16)

### Build System

- **tsconfig:** build for es2022 target ([c75651b](https://github.com/shiftcode/sc-commons/commit/c75651b2b2ca6338e71b6538616d5b0e9bbb40cc))

### BREAKING CHANGES

- **tsconfig:** requires ES2022 support (node@18)

## [6.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@6.0.0...@shiftcode/airtable-sync@6.0.1) (2022-01-17)

### Bug Fixes

- **dependency:** require lambda-utils@7 ([20a97a5](https://github.com/shiftcode/sc-commons/commit/20a97a51b0b1542ff837f4303b37592802a06944))

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
- build(tsconfig.spec): remove unnecessary path ([af1b707](https://github.com/shiftcode/sc-commons/commit/af1b707))
- chore(aws-sdk): use same version in all packages ([08ac152](https://github.com/shiftcode/sc-commons/commit/08ac152))
- chore(jest.config): fix import of utils ([29cab2c](https://github.com/shiftcode/sc-commons/commit/29cab2c))
- chore(peer-deps): remove pr version ([ef34bce](https://github.com/shiftcode/sc-commons/commit/ef34bce))
- fix(peer-dependencies): correct version ([99aa21e](https://github.com/shiftcode/sc-commons/commit/99aa21e))
- fix(peer-dependencies): update versions ([9aac1ed](https://github.com/shiftcode/sc-commons/commit/9aac1ed))
- feat(deps): update dependencies ([5a41426](https://github.com/shiftcode/sc-commons/commit/5a41426))
- feat(deps): update dependencies ([ce9c2d5](https://github.com/shiftcode/sc-commons/commit/ce9c2d5))

### BREAKING CHANGE

- date-fns@^2.28.0 now required as peer dependency
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
- refactor(\*): unify READMEs title ([b779764](https://github.com/shiftcode/sc-commons/commit/b779764))
- revert(version): back to pr ([daf8058](https://github.com/shiftcode/sc-commons/commit/daf8058))
- fix(package.json): author ([67db3f3](https://github.com/shiftcode/sc-commons/commit/67db3f3))
- fix(package.json): correctly set sideEffects property ([11e30b5](https://github.com/shiftcode/sc-commons/commit/11e30b5))
- fix(peer-dependencies): depend on pr93 versions ([b36c70b](https://github.com/shiftcode/sc-commons/commit/b36c70b))
- style(prettier): update to 2.5 and prettify ([47be5f1](https://github.com/shiftcode/sc-commons/commit/47be5f1))
- test(jest): update rename tsconfig.spec and update jest ([30a28ff](https://github.com/shiftcode/sc-commons/commit/30a28ff))
- feat(typescript): use typescript 4.4 and require tslib ^2.3 ([3524ecd](https://github.com/shiftcode/sc-commons/commit/3524ecd))

### BREAKING CHANGE

- requires tslib ^2.3

## <small>4.0.3 (2021-11-09)</small>

**Note:** Version bump only for package @shiftcode/airtable-sync

## <small>4.0.2 (2021-11-08)</small>

**Note:** Version bump only for package @shiftcode/airtable-sync

## <small>4.0.1 (2021-01-22)</small>

- test(tsconfig.jest): add paths ([af64719](https://github.com/shiftcode/sc-commons/commit/af64719))
- chore(package.json): use \* version for dev-deps to peer packages ([a13d261](https://github.com/shiftcode/sc-commons/commit/a13d261))

## 4.0.0 (2020-10-06)

- Merge branch 'master' into #77-reusable-utils ([baa4f26](https://github.com/shiftcode/sc-commons/commit/baa4f26)), closes [#77](https://github.com/shiftcode/sc-commons/issues/77)
- chore(lint-staged): update all configuration files ([ac86637](https://github.com/shiftcode/sc-commons/commit/ac86637))
- refactor(s3-helper): rename method ([3c2a04c](https://github.com/shiftcode/sc-commons/commit/3c2a04c))
- fix(airtable-sync): s3Helper usage ([4f5c5c2](https://github.com/shiftcode/sc-commons/commit/4f5c5c2))

### BREAKING CHANGE

- - s3Helper method uploadDataJson renamed to uploadJson()

## <small>3.0.2 (2020-06-14)</small>

**Note:** Version bump only for package @shiftcode/airtable-sync

## <small>3.0.1 (2020-05-19)</small>

- fix(peerdeps): version of peer deps update ([9dd641d](https://github.com/shiftcode/sc-commons/commit/9dd641d))

## 3.0.0 (2020-05-19)

- feat(typescript): update to typescript 3.9 ([1dc45f5](https://github.com/shiftcode/sc-commons/commit/1dc45f5))

### BREAKING CHANGE

- tslib 2.0.0 required for typescript update

## <small>2.0.8 (2020-05-09)</small>

**Note:** Version bump only for package @shiftcode/airtable-sync

## <small>2.0.7 (2020-04-09)</small>

- style(prettier): prettify all files ([a9552d0](https://github.com/shiftcode/sc-commons/commit/a9552d0))

## <small>2.0.6 (2019-12-19)</small>

- fix(airtable-fetcher): ensure ids is an Array ([bf9812b](https://github.com/shiftcode/sc-commons/commit/bf9812b))

## <small>2.0.5 (2019-12-04)</small>

- chore(deps): bumb a few dev dependencies ([16781af](https://github.com/shiftcode/sc-commons/commit/16781af))

## <small>2.0.4 (2019-12-04)</small>

**Note:** Version bump only for package @shiftcode/airtable-sync

## <small>2.0.3 (2019-12-04)</small>

- chore(ts-config): activate the esModuleInterop flag and refactor imports ([25625df](https://github.com/shiftcode/sc-commons/commit/25625df))
- build(\*): update tsconfig and doc ([71c35a8](https://github.com/shiftcode/sc-commons/commit/71c35a8))
- build(tsconfig): remove unnecesarry lib declaration ([9894dc1](https://github.com/shiftcode/sc-commons/commit/9894dc1))
- build(yarn): migrate to yarn workspace ([8811814](https://github.com/shiftcode/sc-commons/commit/8811814))

## <small>2.0.2 (2019-11-15)</small>

- fix(deps): update version range for @shiftcode/lambda-utils ([fd852a2](https://github.com/shiftcode/sc-commons/commit/fd852a2))

## <small>2.0.1 (2019-11-14)</small>

**Note:** Version bump only for package @shiftcode/airtable-sync

# [2.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/airtable-sync@1.0.0...@shiftcode/airtable-sync@2.0.0) (2019-11-07)

### Bug Fixes

- **airtable-sync:** required peer-dependency ([092291b](https://github.com/shiftcode/sc-commons/commit/092291b11eef8708d3d4fb6b03d7635ebd092f8c))
- **airtable-sync:** typings, tests ([4160976](https://github.com/shiftcode/sc-commons/commit/4160976cd61a64418a645dc1cd9bda7da5f8b70e))

### Features

- **airtable-mapping:** export by language ([4031c94](https://github.com/shiftcode/sc-commons/commit/4031c945452cbdbc1adfcb19d4ff25f971887145))
- **airtable-sync:** fallaback if keyvalue translations are missing ([7a883f5](https://github.com/shiftcode/sc-commons/commit/7a883f5555276eddd22b7c3d7e7089c4e037936a))

### BREAKING CHANGES

- **airtable-mapping:** - its now necessary to specify the supported languages in AirtableSyncConfig

* json files will always receive a `_{lang}.json` suffix in name
* you need to use the exported keyValueMapping for `addMapping(...)` (and use the marker type `KeyValueString` in the model for such types)

# [1.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcoders/airtable-sync@0.1.1...@shiftcoders/airtable-sync@1.0.0) (2019-10-24)

### Bug Fixes

- **airtable-fetcher:** refactor log statements ([ab015b5](https://github.com/shiftcode/sc-commons/commit/ab015b5af03e74eb0b3041dd2585558284f91232))
- **airtable-sync:** fix tests (work with new airtable-mapping package) ([c804d5f](https://github.com/shiftcode/sc-commons/commit/c804d5ffa38ab7ca8dd748e1f8cb13e27c53f170))
- **airtable-sync:** remove super verbose logs ([3754e57](https://github.com/shiftcode/sc-commons/commit/3754e57721ded586543c86df1660bb0f4a92a3a4))
- **airtable.api:** log airtable select options when fetching ([36d15f4](https://github.com/shiftcode/sc-commons/commit/36d15f44a3f7fda387211b747ea01a860228a2fb))
- **airtable.api:** log select options on error ([c6904a6](https://github.com/shiftcode/sc-commons/commit/c6904a6e45c422c3c2a9cff432bdff31a1ce9d7a))

### Code Refactoring

- **airtable:** fix stuff, split into 2 packages ([345f57b](https://github.com/shiftcode/sc-commons/commit/345f57bc86f2cd587b9da1a521cc724b3eb9d6f2))

### Features

- **lambda-logger:** provide inversify module ([b12d7cf](https://github.com/shiftcode/sc-commons/commit/b12d7cfc045c5db9d2cf61284bd39f4d414d7fdb))

### BREAKING CHANGES

- **airtable:** - two packages

## [0.1.1](https://github.com/shiftcode/sc-commons/compare/@shiftcoders/airtable-sync@0.1.0...@shiftcoders/airtable-sync@0.1.1) (2019-10-16)

**Note:** Version bump only for package @shiftcoders/airtable-sync

# 0.1.0 (2019-10-11)

### Features

- **airtable-sync:** new package ([7aa2209](https://github.com/shiftcode/sc-commons/commit/7aa22090171980066fb58a1d1389a5cbaaa5010a))
