# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [10.4.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@10.4.0...@shiftcode/iac-helper@10.4.1) (2026-01-14)

**Note:** Version bump only for package @shiftcode/iac-helper

# [10.4.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@10.3.1...@shiftcode/iac-helper@10.4.0) (2025-09-23)

### Features

- **stage-info:** new script to just print the stage-info to stdout ([f100ae9](https://github.com/shiftcode/sc-commons/commit/f100ae9b1454c76399b4aba79e5e075f15048461))

## [10.3.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@10.3.0...@shiftcode/iac-helper@10.3.1) (2025-09-22)

### Bug Fixes

- **aws-env-vars:** remove empty spaces after last export statement ([716d6ab](https://github.com/shiftcode/sc-commons/commit/716d6abf30bc86d92df470342e7330d85d0d55c6))
- **deps:** change to 5.0.2 branch-utilities as 5.0.0 is unpublished ([ce4d83d](https://github.com/shiftcode/sc-commons/commit/ce4d83d015592b7726f9e66cf29bf132eb62cbe7))

# [10.3.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@10.2.0...@shiftcode/iac-helper@10.3.0) (2025-09-09)

### Features

- add --no-write option to fetch-client-config script ([b816e73](https://github.com/shiftcode/sc-commons/commit/b816e736ba98d201794c156299dacd80c1b37845))

# [10.2.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@10.1.0...@shiftcode/iac-helper@10.2.0) (2025-09-04)

### Features

- **iac-helper:** support latest `@shiftcode/branch-utilities` ([9737261](https://github.com/shiftcode/sc-commons/commit/973726160756369f8c7c5a0bd56de82ee12484aa))

# [10.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@10.0.0...@shiftcode/iac-helper@10.1.0) (2025-08-13)

### Bug Fixes

- **stage-override-to-pr-base:** type GitHub PRs for better type safety ([61b5375](https://github.com/shiftcode/sc-commons/commit/61b53752be5dc327f801cf5fab541feea4f12f10))

### Features

- **iac-helper:** add aws-env-vars script ([75b458f](https://github.com/shiftcode/sc-commons/commit/75b458f62147c9fb7773a1acd054ac91eee42950))
- **iac-helper:** add stage-override-to-pr-base script ([70e5aee](https://github.com/shiftcode/sc-commons/commit/70e5aeea1fd7f119e038849b4d793b806d7d5983))
- **stage-override-to-pr-base:** remove branchNameOverride argument ([a5ff251](https://github.com/shiftcode/sc-commons/commit/a5ff251cb841e9cd6f627fb6b8ac642a2e701230))

# [10.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@9.0.2...@shiftcode/iac-helper@10.0.0) (2025-06-02)

### Build System

- **iac-helper:** upgrade branch-utilities and publish-helper to version 4.0.0 ([4549d59](https://github.com/shiftcode/sc-commons/commit/4549d596b55921c3e8ed5d3c77e214d897611475))

### BREAKING CHANGES

- **iac-helper:** requires @shiftcode/branch-utilities version 4.0.0

## [9.0.2](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@9.0.1...@shiftcode/iac-helper@9.0.2) (2025-05-19)

**Note:** Version bump only for package @shiftcode/iac-helper

## [9.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@9.0.0...@shiftcode/iac-helper@9.0.1) (2025-05-15)

**Note:** Version bump only for package @shiftcode/iac-helper

# [9.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@8.0.1...@shiftcode/iac-helper@9.0.0) (2025-05-01)

### Code Refactoring

- **iac-helper:** deprecate @shiftcode/commons-config package ([a83b00b](https://github.com/shiftcode/sc-commons/commit/a83b00b88d9c55671aaec7925c9528fab4485cb7))

### BREAKING CHANGES

- **iac-helper:** the package @shiftcode/commons-config is no longer available

## [8.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@8.0.0...@shiftcode/iac-helper@8.0.1) (2025-03-06)

### Bug Fixes

- update engines definition (left over from node 22 upgrade) ([f5428ae](https://github.com/shiftcode/sc-commons/commit/f5428ae64c45567912887b8bab1e881c4312669f))

# [8.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@7.1.1...@shiftcode/iac-helper@8.0.0) (2025-03-04)

### Build System

- **deps:** upgrade to node22 ([f9c5712](https://github.com/shiftcode/sc-commons/commit/f9c57121ad78b6bc84cbc70071c595804b5fb08b))

### BREAKING CHANGES

- **deps:** requires node 22

## [7.1.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@7.1.0...@shiftcode/iac-helper@7.1.1) (2024-08-02)

**Note:** Version bump only for package @shiftcode/iac-helper

# [7.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@7.0.3...@shiftcode/iac-helper@7.1.0) (2024-07-31)

### Features

- **iac-helper:** allow more aws sso profile types in schema ([885cdf0](https://github.com/shiftcode/sc-commons/commit/885cdf0205b3d1364b5d832024247ba6df954355))

## [7.0.3](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@7.0.2...@shiftcode/iac-helper@7.0.3) (2024-07-31)

**Note:** Version bump only for package @shiftcode/iac-helper

## [7.0.2](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@7.0.1...@shiftcode/iac-helper@7.0.2) (2024-07-30)

**Note:** Version bump only for package @shiftcode/iac-helper

## [7.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@7.0.0...@shiftcode/iac-helper@7.0.1) (2024-07-29)

**Note:** Version bump only for package @shiftcode/iac-helper

# [7.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@6.3.0...@shiftcode/iac-helper@7.0.0) (2024-07-13)

### Build System

- **node:** upgrade to node 20 ([2899d0d](https://github.com/shiftcode/sc-commons/commit/2899d0d41ece080b276e7bf84915d4849da81a29))

### BREAKING CHANGES

- **node:** Minimum required node version is 20.11.1. In general speaking the runtime (Node or Browser) must support all es2023 features.

# [6.3.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@6.2.1...@shiftcode/iac-helper@6.3.0) (2024-01-25)

### Features

- **iac-helper:** add support for prodKeyword (master | main) ([72849f5](https://github.com/shiftcode/sc-commons/commit/72849f591b9b877613ef21e9c68e23d1ee756147))

## [6.2.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@6.2.0...@shiftcode/iac-helper@6.2.1) (2024-01-25)

**Note:** Version bump only for package @shiftcode/iac-helper

# [6.2.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@6.1.4...@shiftcode/iac-helper@6.2.0) (2023-11-15)

### Features

- **iac-helper:** add helper script (bin) to configure aws sso ([3420d18](https://github.com/shiftcode/sc-commons/commit/3420d1841c07c123e241504cd8463dbd506861a2))
- **iac-helper:** update schema ([cd4d586](https://github.com/shiftcode/sc-commons/commit/cd4d586b546ae9bdbcd1bb44fd34f225db97afe8))
- **iac-helper:** update sso configure script ([6e14615](https://github.com/shiftcode/sc-commons/commit/6e1461586446f82af24966b7cb2fc0601c3af79e))

## [6.1.4](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@6.1.3...@shiftcode/iac-helper@6.1.4) (2023-10-26)

### Bug Fixes

- **iac-helper:** fixed invalidated-cf-cache function when used with multiple paths ([a01c5d1](https://github.com/shiftcode/sc-commons/commit/a01c5d13eb1ee85c8016cc121c70de847cbc511a))

## [6.1.3](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@6.1.2...@shiftcode/iac-helper@6.1.3) (2023-10-18)

**Note:** Version bump only for package @shiftcode/iac-helper

## [6.1.2](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@6.1.1...@shiftcode/iac-helper@6.1.2) (2023-07-27)

**Note:** Version bump only for package @shiftcode/iac-helper

## [6.1.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@6.1.0...@shiftcode/iac-helper@6.1.1) (2023-06-01)

**Note:** Version bump only for package @shiftcode/iac-helper

# [6.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@6.0.1...@shiftcode/iac-helper@6.1.0) (2023-06-01)

### Features

- **eslint-config:** add eslint-disable comments ([3716577](https://github.com/shiftcode/sc-commons/commit/37165771b8ac0e94bdcc7f90b55e41d358db9d65))

## [6.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@6.0.0...@shiftcode/iac-helper@6.0.1) (2023-05-26)

**Note:** Version bump only for package @shiftcode/iac-helper

# [6.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@5.1.0...@shiftcode/iac-helper@6.0.0) (2023-05-15)

### Code Refactoring

- **iac-helper:** remove depreacted functionality ([9def5a5](https://github.com/shiftcode/sc-commons/commit/9def5a5d53a0275ad0bc8a198de8cf0dee403aab))
- **iac-helper:** remove depreacted functionality ([5b6802c](https://github.com/shiftcode/sc-commons/commit/5b6802c43c7c141dec8c5ab7221eace388e84b64))

### Features

- **iac-helper:** migrate to ESM ([79046e7](https://github.com/shiftcode/sc-commons/commit/79046e7c459d57e2b801e441f468b50c1c6bb8d1))
- **iac-helper:** migrate to ESM (different related changes) ([9ac4f82](https://github.com/shiftcode/sc-commons/commit/9ac4f82991e30d0804a1417b91c3a5eab1f39600))

### BREAKING CHANGES

- **iac-helper:** deprecated functionality (runtimeConfig & getRuntimeConfigForEnv) was removed, use stageInfo & region directly
- **iac-helper:** deprecated feature (publishClientToS3) was removed, use uploadToS3 instead
- **iac-helper:** only supported in projects using ESM
- **iac-helper:** only supported in projects using ESM

# [5.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@5.0.0...@shiftcode/iac-helper@5.1.0) (2023-03-17)

### Features

- **eslint-plugin:** introduce tests to verify correct implementation of plugins ([76d5b2f](https://github.com/shiftcode/sc-commons/commit/76d5b2f2bea5a3f4450e7ce43153fc2ddba832c1))

# [5.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@4.3.0...@shiftcode/iac-helper@5.0.0) (2023-03-16)

### Build System

- **tsconfig:** build for es2022 target ([c75651b](https://github.com/shiftcode/sc-commons/commit/c75651b2b2ca6338e71b6538616d5b0e9bbb40cc))

### Code Refactoring

- **get-account-id:** removed ([3af4bf1](https://github.com/shiftcode/sc-commons/commit/3af4bf1daea8b06b1b2f02b4b07f82c39d178853))
- **iac-helper:** buildTimeBaseRuntimeConfigProvider ([2b13680](https://github.com/shiftcode/sc-commons/commit/2b1368023ed1bb2f0b8d0a13254600c5482a472b))
- **iac-helper:** update [@aws-sdk](https://github.com/aws-sdk) libs ([e2dce72](https://github.com/shiftcode/sc-commons/commit/e2dce72fd3d1096f6a6f4be2e19e6aebea673ebb))
- **iac-stack-config-service:** removed getEnvFromDeployedFunction as it does not belong here ([efd59eb](https://github.com/shiftcode/sc-commons/commit/efd59eb19cabc8e2701b29dcd6808f7a9434ca94))
- **iac-stack-config.service:** removed old stuff ([0d124cc](https://github.com/shiftcode/sc-commons/commit/0d124cc93acfa8a5a8f1722fe87a70ea918acdcb))
- **runtime-config-module:** removed ([18a8eab](https://github.com/shiftcode/sc-commons/commit/18a8eabc4a7d2e7d1cee715d2e010327ad11df04))

### BREAKING CHANGES

- **iac-stack-config.service:** IacStackConfigService constructor changed and it no longer provides `sharedData`, `getSharedDataForEnv` and `getSharedDataFromEnv`
- **runtime-config-module:** runtimeConfigModule (inversify) was removed
- **tsconfig:** requires ES2022 support (node@18)
- **iac-helper:** previously used `aws-sdk/global` config provider supported env and dot files. now reading the 'AWS_REGION' env var only which means it would no longer work with other sorts of aws config than via ENV
- **iac-helper:** iac-helper requires @aws-sdk libs ^3.204.0
- **iac-stack-config-service:** removed getEnvFromDeployedFunction() method from IacStackConfigService
  no replacement yet - if actually needed, move it from fadas to sc-commons/iac-helper as plain function (with optional dep)
- **get-account-id:** removed getAccountId() function
  instead use `process.env.CDK_DEFAULT_ACCOUNT` if you actually need the account id (which you probably don't)

# [4.3.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@4.2.0...@shiftcode/iac-helper@4.3.0) (2022-10-11)

### Features

- **stage-info:** new script to export stage info ([edf4b83](https://github.com/shiftcode/sc-commons/commit/edf4b836cd88fc496da10dd248a23da4a917e83a))

# [4.2.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@4.1.0...@shiftcode/iac-helper@4.2.0) (2022-04-26)

### Features

- **scripts/fetch-client-config:** new `key` option used to read from the outputs ([cd12f7f](https://github.com/shiftcode/sc-commons/commit/cd12f7fb6b1ec30063a0dcfd89a9eca0326af336))
- **scripts/invalidate-cf-cache:** new `key` option used to read from the outputs ([3e58146](https://github.com/shiftcode/sc-commons/commit/3e581466317177abf240d78c53b22b05d0465b3a))
- **scripts/publish-client-to-s3:** add option to skip the `pruning` of the bucket ([d63a853](https://github.com/shiftcode/sc-commons/commit/d63a853e3c842d334a2381e133250015e38fef72))
- **scripts/publish-client-to-s3:** new `key` option used to read from the outputs ([c80604e](https://github.com/shiftcode/sc-commons/commit/c80604e95467b75a04f03776c83b495584dabb7a))

# [4.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@4.0.1...@shiftcode/iac-helper@4.1.0) (2022-03-31)

### Features

- **credentials-helper:** add sso credentials-helper script to use with old sdk v2 tools ([8d0198d](https://github.com/shiftcode/sc-commons/commit/8d0198d6d524de57289f3b90e5af5e7c0e520d0f))

## [4.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/iac-helper@4.0.0...@shiftcode/iac-helper@4.0.1) (2022-01-17)

### Bug Fixes

- **dependency:** require lambda-utils@7 ([cd204a1](https://github.com/shiftcode/sc-commons/commit/cd204a1bd3aa51d9125c8fe0a6a4799bea5e2680))

## 4.0.0 (2022-01-11)

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
- build(tsconfig.spex): fix paths ([cde6281](https://github.com/shiftcode/sc-commons/commit/cde6281))
- test(handler-to-bundle-info.function): fix typo in spec ([61270ec](https://github.com/shiftcode/sc-commons/commit/61270ec))
- chore(aws-sdk): use same version in all packages ([08ac152](https://github.com/shiftcode/sc-commons/commit/08ac152))
- chore(barrel-file): create own barrel file for base dir ([6a87c83](https://github.com/shiftcode/sc-commons/commit/6a87c83))
- chore(deps): update ([ef20963](https://github.com/shiftcode/sc-commons/commit/ef20963))
- chore(peer-deps): remove pr version ([ef34bce](https://github.com/shiftcode/sc-commons/commit/ef34bce))
- ci(prepare-dist): use from new sc-commons-public package ([5ad1e4e](https://github.com/shiftcode/sc-commons/commit/5ad1e4e))
- refactor(get-lambda-props): removed ([e02b161](https://github.com/shiftcode/sc-commons/commit/e02b161))
- refactor(peer-dependencies): use branch-utilities lib from sc-commons-public ([a35b7af](https://github.com/shiftcode/sc-commons/commit/a35b7af))
- refactor(stack-with-shared-data): removed ([bfb9860](https://github.com/shiftcode/sc-commons/commit/bfb9860))
- refactor(webpack-build-helper): removed since outdated ([2f3012f](https://github.com/shiftcode/sc-commons/commit/2f3012f))
- fix(dependencies): cleanup ([9119e8f](https://github.com/shiftcode/sc-commons/commit/9119e8f))
- fix(deps): move runtime dev-dependencies ([aa73004](https://github.com/shiftcode/sc-commons/commit/aa73004))
- fix(deps): remove Nullable helper ([d470494](https://github.com/shiftcode/sc-commons/commit/d470494))
- fix(extend-with-iac-utils): make props accessible in extending class ([cfe1ff2](https://github.com/shiftcode/sc-commons/commit/cfe1ff2))
- fix(extend-with-iac-utils): typo ([65c8862](https://github.com/shiftcode/sc-commons/commit/65c8862))
- fix(iac-utils): resolve test issue ([ac77f2a](https://github.com/shiftcode/sc-commons/commit/ac77f2a))
- fix(peer-dependencies): correct version ([99aa21e](https://github.com/shiftcode/sc-commons/commit/99aa21e))
- fix(peer-dependencies): update versions ([9aac1ed](https://github.com/shiftcode/sc-commons/commit/9aac1ed))
- fix(scripts): accept promise options ([39bdb70](https://github.com/shiftcode/sc-commons/commit/39bdb70))
- fix(typings): prepare for ts 4.5 ([5025471](https://github.com/shiftcode/sc-commons/commit/5025471))
- feat(deps): update inversify to v6 and mime to v3 ([b1912f2](https://github.com/shiftcode/sc-commons/commit/b1912f2))
- feat(extend-with-iac-utils): functions to dynamically extend base class ([e95f053](https://github.com/shiftcode/sc-commons/commit/e95f053))
- feat(handler-to-bundle-info): allow additional arg for destDir ([afa64dc](https://github.com/shiftcode/sc-commons/commit/afa64dc))
- feat(iac-stack-config-service): support stage-switchable properties ([014bc1e](https://github.com/shiftcode/sc-commons/commit/014bc1e))
- style(prettier): prettify ([4887470](https://github.com/shiftcode/sc-commons/commit/4887470))

### BREAKING CHANGE

- getLambdaProps was removed since not recommended to use
- NestedStackWithSharedData/StackWithSharedData was removed
  use extendWithIacUtils(Stack) instead (see spec for example)
- Nullable helper type was removed. use from @shiftcode/utils instead
- requires inversify@^6.0.1
- webpack-build-helper was removed since outdated

## 3.0.0 (2021-12-23)

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
- build(typescript): remove separate ts version ([657c447](https://github.com/shiftcode/sc-commons/commit/657c447))
- refactor(\*): replace npm run with yarn ([238adbc](https://github.com/shiftcode/sc-commons/commit/238adbc))
- refactor(\*): replace yarn run with yarn ([ef0d2f7](https://github.com/shiftcode/sc-commons/commit/ef0d2f7))
- refactor(\*): unify READMEs title ([b779764](https://github.com/shiftcode/sc-commons/commit/b779764))
- refactor(bin-scripts): export main functions to use from code ([6799993](https://github.com/shiftcode/sc-commons/commit/6799993))
- refactor(iac-helper): use branch-utils package ([c20c084](https://github.com/shiftcode/sc-commons/commit/c20c084))
- revert(version): back to pr ([daf8058](https://github.com/shiftcode/sc-commons/commit/daf8058))
- fix(deps): update just-snake-case to v3 ([14cfd22](https://github.com/shiftcode/sc-commons/commit/14cfd22))
- fix(export-base-runtime-config): add she-bang ([697a805](https://github.com/shiftcode/sc-commons/commit/697a805))
- fix(export-cfn-outputs): add script ([3c85f72](https://github.com/shiftcode/sc-commons/commit/3c85f72))
- fix(package.json): @shiftcode versions ([c9b0c7d](https://github.com/shiftcode/sc-commons/commit/c9b0c7d))
- fix(package.json): author ([67db3f3](https://github.com/shiftcode/sc-commons/commit/67db3f3))
- fix(package.json): correctly set sideEffects property ([11e30b5](https://github.com/shiftcode/sc-commons/commit/11e30b5))
- fix(peer-dependencies): depend on pr93 versions ([b36c70b](https://github.com/shiftcode/sc-commons/commit/b36c70b))
- fix(publish-client-to-s3): cli options ([613e067](https://github.com/shiftcode/sc-commons/commit/613e067))
- fix(scripts): move to root ([b9e619e](https://github.com/shiftcode/sc-commons/commit/b9e619e))
- feat(fetch-client-config): add script ([7d7eea0](https://github.com/shiftcode/sc-commons/commit/7d7eea0))
- feat(invalidate-cf-cache): add script ([a2bc06c](https://github.com/shiftcode/sc-commons/commit/a2bc06c))
- feat(publish-client-to-s3): actually validate definitions ([d12f12e](https://github.com/shiftcode/sc-commons/commit/d12f12e))
- feat(publish-client-to-s3): add script to upload client ([b143b11](https://github.com/shiftcode/sc-commons/commit/b143b11))
- feat(scripts): enhance export-base-runtime-config ([0d40bff](https://github.com/shiftcode/sc-commons/commit/0d40bff))
- feat(typescript): use typescript 4.4 and require tslib ^2.3 ([3524ecd](https://github.com/shiftcode/sc-commons/commit/3524ecd))
- style(prettier): update to 2.5 and prettify ([47be5f1](https://github.com/shiftcode/sc-commons/commit/47be5f1))
- test(jest): update rename tsconfig.spec and update jest ([30a28ff](https://github.com/shiftcode/sc-commons/commit/30a28ff))
- chore(prepublish): fix script call ([56e67b1](https://github.com/shiftcode/sc-commons/commit/56e67b1))

### BREAKING CHANGE

- requires peer dependency @shiftcode/branch-utils
- requires tslib ^2.3

## <small>2.1.3 (2021-11-09)</small>

**Note:** Version bump only for package @shiftcode/iac-helper

## <small>2.1.2 (2021-11-08)</small>

**Note:** Version bump only for package @shiftcode/iac-helper

## <small>2.1.1 (2021-09-03)</small>

**Note:** Version bump only for package @shiftcode/iac-helper

## 2.1.0 (2021-09-03)

- feat(iac-helper): add export-base-runtime-config executable ([4cc5f28](https://github.com/shiftcode/sc-commons/commit/4cc5f28))
- refactor(build-helper): flatten publish artifact ([0225ada](https://github.com/shiftcode/sc-commons/commit/0225ada))

## <small>2.0.2 (2021-03-31)</small>

**Note:** Version bump only for package @shiftcode/iac-helper

## <small>2.0.1 (2021-01-22)</small>

- chore(package.json): use \* version for dev-deps to peer packages ([a13d261](https://github.com/shiftcode/sc-commons/commit/a13d261))

## 2.0.0 (2020-10-06)

- refactor(build-helper): remove dist/\_cjs/publish-lib file ([ecf2451](https://github.com/shiftcode/sc-commons/commit/ecf2451))
- refactor(iac-helper): flatten iac-stack-config constructor args ([fec659e](https://github.com/shiftcode/sc-commons/commit/fec659e))
- refactor(iac-helper): optional dependencies and deep exports ([0d38774](https://github.com/shiftcode/sc-commons/commit/0d38774))
- refactor(prod-switchable): export type to be reused ([a432d56](https://github.com/shiftcode/sc-commons/commit/a432d56))
- Merge branch 'master' into #77-reusable-utils ([baa4f26](https://github.com/shiftcode/sc-commons/commit/baa4f26)), closes [#77](https://github.com/shiftcode/sc-commons/issues/77)
- feat(iac-helper): getProdDependantProp fun with sophisticated typings ([aa5f6b6](https://github.com/shiftcode/sc-commons/commit/aa5f6b6))
- feat(iac-helper): nested-stack-with-shared-data ([bdffbbd](https://github.com/shiftcode/sc-commons/commit/bdffbbd))
- feat(iac-helper): StackWithSharedData common cf outputs ([c2bae99](https://github.com/shiftcode/sc-commons/commit/c2bae99))
- chore(lint-staged): update all configuration files ([ac86637](https://github.com/shiftcode/sc-commons/commit/ac86637))
- fix(iac-helper): allow custom root dir for lambda functions ([d1e9b07](https://github.com/shiftcode/sc-commons/commit/d1e9b07))
- fix(iac-helper): allow custom root dir for lambda functions ([97f58be](https://github.com/shiftcode/sc-commons/commit/97f58be))
- fix(iac-helper): cfn output colon instead of dot ([05f882e](https://github.com/shiftcode/sc-commons/commit/05f882e))
- fix(iac-helper): change build and publish scripts ([f5ee994](https://github.com/shiftcode/sc-commons/commit/f5ee994))
- fix(iac-helper): package versions in opt deps ([0a7965d](https://github.com/shiftcode/sc-commons/commit/0a7965d))
- fix(iac-helper): publish config ([40692e1](https://github.com/shiftcode/sc-commons/commit/40692e1))
- fix(iac-helper): stack-with-shared-data output ([2e78a3a](https://github.com/shiftcode/sc-commons/commit/2e78a3a))
- fix(iac-helper): stack-with-shared-data output ([953ca05](https://github.com/shiftcode/sc-commons/commit/953ca05))
- fix(iac-helper): stackWithSharedData import ([9a4d5cd](https://github.com/shiftcode/sc-commons/commit/9a4d5cd))
- fix(iac-helper): tslint:disable:no-unused-expression ([22988a4](https://github.com/shiftcode/sc-commons/commit/22988a4))
- fix(iac-helper): user build-helper pre-publish-lib ([12cde06](https://github.com/shiftcode/sc-commons/commit/12cde06))

### BREAKING CHANGE

- - to make sure optional dependencies are actually optional, deep exports are necessary.

* DefaultLambda no longer exists. Instead a helper function getLambdaProps was added

## <small>1.1.1 (2020-06-14)</small>

**Note:** Version bump only for package @shiftcode/iac-helper

## 1.1.0 (2020-05-19)

- feat(aws): account id function trough sts ([32025a2](https://github.com/shiftcode/sc-commons/commit/32025a2))

## <small>1.0.1 (2020-05-19)</small>

- fix(peerdeps): version of peer deps update ([9dd641d](https://github.com/shiftcode/sc-commons/commit/9dd641d))

## 1.0.0 (2020-05-19)

- feat(typescript): update to typescript 3.9 ([1dc45f5](https://github.com/shiftcode/sc-commons/commit/1dc45f5))

### BREAKING CHANGE

- tslib 2.0.0 required for typescript update

## 0.1.0 (2020-05-11)

- feat(iac-helper): code from baikonur ([3c547d9](https://github.com/shiftcode/sc-commons/commit/3c547d9))
