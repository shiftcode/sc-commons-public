# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.5.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/eslint-config@2.4.0...@shiftcode/eslint-config@2.5.0) (2023-10-18)

### Bug Fixes

- **defaults:** disable no-unsafe-enum-comparison ([dbfd6aa](https://github.com/shiftcode/sc-commons/commit/dbfd6aac52aea6969c690a17ea58d76724426d1b))

### Features

- **no-unused-imports:** new rule with fixer ([d1b75f6](https://github.com/shiftcode/sc-commons/commit/d1b75f623e8d4d81b5bc9943b23ad510d4b15607))
- **prefix-builtin-module-import:** use new rule to fix builtin imports ([087ec70](https://github.com/shiftcode/sc-commons/commit/087ec7082c4bd28c44b59f43bfbabcbe59845dd5))

# [2.4.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/eslint-config@2.3.1...@shiftcode/eslint-config@2.4.0) (2023-07-27)

### Bug Fixes

- **eslint-config:** enable no-console rule ([85f0789](https://github.com/shiftcode/sc-commons/commit/85f0789aecc290677e8ac67d952b6e977c421bf1))
- **eslint-config:** include test folder for test specific rules ([be4a2eb](https://github.com/shiftcode/sc-commons/commit/be4a2eb5cf8c846b240d3ab6c9a8ec6dbb2f76b8))
- **eslint-config:** reorder to actually activate \*.spec.ts rules ([231ab5d](https://github.com/shiftcode/sc-commons/commit/231ab5db3f0e068746cb96ce7f77b9ede0bc8ca5))
- **eslint-config:** update test glob ([1ad927c](https://github.com/shiftcode/sc-commons/commit/1ad927c02caa12027d153e2e7950162b9510b81d))

### Features

- **eslint-config:** allow dependencies to be defined in root for tests ([127f3e7](https://github.com/shiftcode/sc-commons/commit/127f3e74803d088d536a00bdcc8225416026d5ae))

## [2.3.1](https://github.com/shiftcode/sc-commons/compare/@shiftcode/eslint-config@2.3.0...@shiftcode/eslint-config@2.3.1) (2023-06-12)

### Bug Fixes

- **eslint-config:** move deps to peer deps and mark as optional ([534ae86](https://github.com/shiftcode/sc-commons/commit/534ae863ff7cc35ee26f6476bed829bf382b52ed))

# [2.3.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/eslint-config@2.2.0...@shiftcode/eslint-config@2.3.0) (2023-06-01)

### Features

- **eslint-config:** add dep to deslint-config-prettier ([3b5ad02](https://github.com/shiftcode/sc-commons/commit/3b5ad0225b9f9abd703aecd7025a117202c65549))

# [2.2.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/eslint-config@2.1.0...@shiftcode/eslint-config@2.2.0) (2023-06-01)

### Features

- **eslint-config:** add eslint-disable comments ([3716577](https://github.com/shiftcode/sc-commons/commit/37165771b8ac0e94bdcc7f90b55e41d358db9d65))
- **eslint-config:** add max-classes-per-file rule ([e5c4273](https://github.com/shiftcode/sc-commons/commit/e5c427314ee8bda5f7603979fd048ade801be40f))
- **eslint-config:** disable max-classes-per-file for test files ([bc14151](https://github.com/shiftcode/sc-commons/commit/bc14151c87ca4de1a90fc1f9a592f78614e4c579))

# [2.1.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/eslint-config@2.0.0...@shiftcode/eslint-config@2.1.0) (2023-05-26)

### Features

- **eslint-config:** update default config ([44fd5be](https://github.com/shiftcode/sc-commons/commit/44fd5beedf5e5f0698e933c769f1f19d4533e91f))

# [2.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/eslint-config@1.0.0...@shiftcode/eslint-config@2.0.0) (2023-05-15)

### Features

- **eslint-config:** migrate to ESM (different related changes) ([0fc2382](https://github.com/shiftcode/sc-commons/commit/0fc2382f69695eccce00dd1fb293e1f8b791afda))
- **eslint-plugin:** support angular@15 ([ee6b3ea](https://github.com/shiftcode/sc-commons/commit/ee6b3eadfa3873f24819a91b9b0837c80bfa0f14))

### BREAKING CHANGES

- **eslint-plugin:** requires angular ^15.0.0
- **eslint-config:** only supported in projects using ESM

# 1.0.0 (2023-03-17)

### Bug Fixes

- **eslint-config:** remove unused mkdir command ([457ac04](https://github.com/shiftcode/sc-commons/commit/457ac044578c20f08770259e11bcc49878be8194))

### Features

- **eslint-config:** new package that is based on wide open floor, using bare minimal setup ([8c2c405](https://github.com/shiftcode/sc-commons/commit/8c2c4054dec65fb76eec0de96c2bf62f53e90e39))
- **sc-commons:** add package for eslint configuration ([72c9511](https://github.com/shiftcode/sc-commons/commit/72c9511e525a4889172d511ff53355c4d3208617))

### Reverts

- Revert "refactor(eslint-config): change to js file type and module.exports declaration" ([b56e762](https://github.com/shiftcode/sc-commons/commit/b56e762ec6a057f5c9d7ccdb1999d798211816b4))
