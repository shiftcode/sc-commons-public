# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.4.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@5.3.0...@shiftcode/cdk-utils@5.4.0) (2026-01-23)

### Features

- **cloud-watch-api:** new construct ([66226e2](https://github.com/shiftcode/sc-commons/commit/66226e2cd457366453c5a9fbf3b33bc150889f93))

# [5.3.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@5.2.0...@shiftcode/cdk-utils@5.3.0) (2026-01-09)

### Features

- **cloud-watch-log-transport:** add documentation for external certificate usage ([8d4ebc3](https://github.com/shiftcode/sc-commons/commit/8d4ebc3a730dee63114b19c318c29872d300b4c6))

# [5.2.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@5.1.0...@shiftcode/cdk-utils@5.2.0) (2025-12-19)

### Features

- **cdk-utils:** accept ILogGroup as prop ([a52020b](https://github.com/shiftcode/sc-commons/commit/a52020b5207ec71ca92bb2033b015cd857cbd985))

# [5.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@5.0.0...@shiftcode/cdk-utils@5.1.0) (2025-09-23)

### Features

- **language-redirect-cf-function:** new construct for CF function ([3db9a1b](https://github.com/shiftcode/sc-commons/commit/3db9a1b60c2137c034ca1ed57b297977224e19f0))
- **language-redirect-cf-function:** new construct for CF function ([a62f510](https://github.com/shiftcode/sc-commons/commit/a62f51045e8c0673c6b22e39133e99a3333b34a8))

# [5.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@4.1.1...@shiftcode/cdk-utils@5.0.0) (2025-05-23)

### Bug Fixes

- **cloud-watch-log-transport:** improve message escaping in log events ([4ea32ca](https://github.com/shiftcode/sc-commons/commit/4ea32ca3855b89c74e2ff2626db36ab2b8b61c05))
- **cloud-watch-log-transport:** treat message as JSON instead of string for CloudWatch API ([7b815a7](https://github.com/shiftcode/sc-commons/commit/7b815a74f9e0dd6ddc1f1fce1dcd3d14ef226ad7))

### Features

- **cloud-watch-log-transport:** include stack name in API name for better identification ([a1be41c](https://github.com/shiftcode/sc-commons/commit/a1be41cc17944c9ec0a73d25bf6b28a0ffe8031d))

### BREAKING CHANGES

- **cloud-watch-log-transport:** requires stackName for API name

## [4.1.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@4.1.0...@shiftcode/cdk-utils@4.1.1) (2025-05-21)

### Bug Fixes

- **cloud-watch-log-transport:** set CORS header dynamically based on allowed origins length ([229cc71](https://github.com/shiftcode/sc-commons/commit/229cc719ce0edb293021c9264d0402f7e3277e89))
- **cloud-watch-log-transport:** update CORS header to ensure Access-Control-Allow-Origin compliance ([50c8ff3](https://github.com/shiftcode/sc-commons/commit/50c8ff3b5d57cc20ac2bbe548f4d85b8232453da))

# [4.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@4.0.2...@shiftcode/cdk-utils@4.1.0) (2025-05-14)

### Bug Fixes

- **cloud-watch-log:** add Access-Control-Allow-Origin to the response params ([e780a40](https://github.com/shiftcode/sc-commons/commit/e780a4085cbdb8e688107c621c2df4f894b0aebf))

### Features

- **cloud-watch-log-transport:** expose log endpoints ([0c24b61](https://github.com/shiftcode/sc-commons/commit/0c24b61d197d92a16f2408f2aa2022d04f77a39c))
- **cloud-watch-log-transport:** make domain config optional ([e5d75a4](https://github.com/shiftcode/sc-commons/commit/e5d75a41f3be15bb789cb7ff8dfbb00707126ea3))
- **cloud-watch-log:** add integration and method responses to capture API errors ([e484ccb](https://github.com/shiftcode/sc-commons/commit/e484ccbd22070d44f14da3f5bb7bc9e089b9960b))
- **cloud-watch-log:** move log group to props to make it configurable ([f39beae](https://github.com/shiftcode/sc-commons/commit/f39beae4da1ac7da425be9d9478aa3a3ca2607b4))
- **logs:** add CloudWatchLogTransport construct and test CDK app ([82788e9](https://github.com/shiftcode/sc-commons/commit/82788e92650fb39f3039208d1f45e1a141c58f80))

## [4.0.2](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@4.0.1...@shiftcode/cdk-utils@4.0.2) (2025-03-06)

### Bug Fixes

- update engines definition (left over from node 22 upgrade) ([f5428ae](https://github.com/shiftcode/sc-commons/commit/f5428ae64c45567912887b8bab1e881c4312669f))

## [4.0.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@4.0.0...@shiftcode/cdk-utils@4.0.1) (2025-03-04)

**Note:** Version bump only for package @shiftcode/cdk-utils

# [4.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@3.1.0...@shiftcode/cdk-utils@4.0.0) (2024-07-13)

### Build System

- **node:** upgrade to node 20 ([2899d0d](https://github.com/shiftcode/sc-commons/commit/2899d0d41ece080b276e7bf84915d4849da81a29))

### BREAKING CHANGES

- **node:** Minimum required node version is 20.11.1. In general speaking the runtime (Node or Browser) must support all es2023 features.

# [3.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@3.0.0...@shiftcode/cdk-utils@3.1.0) (2023-12-18)

### Features

- **eslint-config:** disabled mt-specific config and added curly, eqeqeq ([9b2c7a0](https://github.com/shiftcode/sc-commons/commit/9b2c7a0e668949c022d8338e619fda09615c0dad))

# [3.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@2.1.0...@shiftcode/cdk-utils@3.0.0) (2023-05-15)

### Features

- **cdk-utils:** migrate to ESM (different related changes) ([9afff84](https://github.com/shiftcode/sc-commons/commit/9afff84ac559cf4d365f9db54b107bff921a56ad))

### BREAKING CHANGES

- **cdk-utils:** only supported in projects using ESM

# [2.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@2.0.0...@shiftcode/cdk-utils@2.1.0) (2023-03-17)

### Features

- **eslint-plugin:** introduce tests to verify correct implementation of plugins ([76d5b2f](https://github.com/shiftcode/sc-commons/commit/76d5b2f2bea5a3f4450e7ce43153fc2ddba832c1))

# [2.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@1.1.0...@shiftcode/cdk-utils@2.0.0) (2023-03-16)

### Bug Fixes

- **basic-auth-cf-function:** import ([e19af26](https://github.com/shiftcode/sc-commons/commit/e19af26f536cdb06bfcf2a5f57be2b1de5b5aa6c))

### Build System

- **tsconfig:** build for es2022 target ([c75651b](https://github.com/shiftcode/sc-commons/commit/c75651b2b2ca6338e71b6538616d5b0e9bbb40cc))

### BREAKING CHANGES

- **tsconfig:** requires ES2022 support (node@18)

# [1.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/cdk-utils@1.0.0...@shiftcode/cdk-utils@1.1.0) (2022-04-01)

### Features

- **basic-auth-cf-function.construct:** new construct ([e5d2e16](https://github.com/shiftcode/sc-commons/commit/e5d2e168b02179c4d4324194105138f227dea91a))

## 1.0.0 (2022-01-11)

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
- ci(prepare-dist): use from new sc-commons-public package ([5ad1e4e](https://github.com/shiftcode/sc-commons/commit/5ad1e4e))
- fix(deps): move runtime dev-dependencies ([aa73004](https://github.com/shiftcode/sc-commons/commit/aa73004))
- fix(imports): no deep imports from aws-cdk-lib/core ([67a17ee](https://github.com/shiftcode/sc-commons/commit/67a17ee))
- feat(cdk-utils): new package for reusable cdk constructs / custom resources ([8842248](https://github.com/shiftcode/sc-commons/commit/8842248))

### BREAKING CHANGE

- new package `@shiftcode/cdk-utils`
