# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.1.0](https://github.com/shiftcode/sc-commons-public/compare/%40shiftcode%2Fcdk-utilities%401.0.1...%40shiftcode%2Fcdk-utilities%401.1.0) (2026-11-05)

### Bug Fixes

- **cdk-utilities:** depend on broad invoke permission in log error subscriptions ([a84d97f](https://github.com/shiftcode/sc-commons-public/commit/a84d97fbccaa00b44338bfc1d65b61f7143aff2f))
- **cdk-utilities:** fix log insights query pattern ([f6ad0b8](https://github.com/shiftcode/sc-commons-public/commit/f6ad0b841fb38ba4671e1b127e85839f0dda4b67))
- **cdk-utilities:** fix publish-error-logs-to-slack-fn.spec.ts ([ca93c48](https://github.com/shiftcode/sc-commons-public/commit/ca93c480690107ed79d04d2803bcc562c9c0ef18))
- **cdk-utilities:** format log event time as ISO date in alarm messages ([e976e91](https://github.com/shiftcode/sc-commons-public/commit/e976e9102c5c44bf102883a683a68813529b0afa))
- **cdk-utilities:** improved log insights query ([9f105fc](https://github.com/shiftcode/sc-commons-public/commit/9f105fcf8d5e4f966ba58b8982ca4701a3c1e1ab))
- **cdk-utilities:** only add request id filter to log insights query when available ([f19eef9](https://github.com/shiftcode/sc-commons-public/commit/f19eef9d62b80a4b6a81ef1a9e8be75f27b8f5c3))
- **cdk-utilities:** reject unsuccessful Slack alarm responses ([1c6cf2a](https://github.com/shiftcode/sc-commons-public/commit/1c6cf2a8cf7ad3f8ec7d2509323947bd2a081a92))
- **cdk-utilities:** truncate slack error message below section limit ([cc044fc](https://github.com/shiftcode/sc-commons-public/commit/cc044fcb0dc66502b429df4bed0b4eded0858753))
- **cdk-utilities:** try to avoid stack outputs/imports for topic & lambda ARNs ([f2dff05](https://github.com/shiftcode/sc-commons-public/commit/f2dff05052ce68e71834c717cbd16b9547d11c4f))
- **cdk-utilities:** update dependencies ([0746925](https://github.com/shiftcode/sc-commons-public/commit/074692512ed6c4eeb4c2ba6ac1a36da7ed345b89))

### Features

- **cdk-utilities:** add alarming construct to streamline alarming setup ([6f60c40](https://github.com/shiftcode/sc-commons-public/commit/6f60c40f3edb11c6afc0c4d9bf324e5988b945a9))
- **cdk-utilities:** add options for CloudWatch Logs permissions management in alarming construct ([2d76e96](https://github.com/shiftcode/sc-commons-public/commit/2d76e9624509dcd8f4dda22b88c488bc44d80689))
- **cdk-utilities:** added default descriptions to metric alarm props ([d6c50ce](https://github.com/shiftcode/sc-commons-public/commit/d6c50ce616349b0e57ae05baf0314a466b869da7))
- **cdk-utilities:** enhance logging to support structured object messages in JSON format ([6a2c66b](https://github.com/shiftcode/sc-commons-public/commit/6a2c66b3a2feab7b50cc8e1d870e8dfb3a8e9910))
- **cdk-utilities:** extend config error log handling case in cloudwatch.utils.ts ([13452a9](https://github.com/shiftcode/sc-commons-public/commit/13452a9980f682550cd833e60226c961b450de0c))
- **cdk-utilities:** implement dynamic lambda function naming with hash for length constraints ([b8692cd](https://github.com/shiftcode/sc-commons-public/commit/b8692cdb8ca5dd30aca4e629b87c4cdb6bcb0abb))
- **cdk-utilities:** integrate params-and-secrets layer for Slack webhook retrieval ([86cc917](https://github.com/shiftcode/sc-commons-public/commit/86cc917b74dc96840f88adacf2ed28d4a5d7c7ce))
- **cdk-utilities:** region aware service principal ([1500080](https://github.com/shiftcode/sc-commons-public/commit/15000805e62b7cb1794f6d2722927f5b76c57236))

### Performance Improvements

- **cdk-utilities:** prefer ESM dependencies in lambda bundles ([280a880](https://github.com/shiftcode/sc-commons-public/commit/280a8806a82685c72a0c4a6991eea9ae9809e104))

## [1.0.1](https://github.com/shiftcode/sc-commons-public/compare/%40shiftcode%2Fcdk-utilities%401.0.0...%40shiftcode%2Fcdk-utilities%401.0.1) (2026-10-26)

**Note:** Version bump only for package @shiftcode/cdk-utilities

# 1.0.0 (2026-03-18)

### Build System

- update supported node version ([85d5fc1](https://github.com/shiftcode/sc-commons-public/commit/85d5fc19d7822abc0e44e07a45258baa95e31482))

### chore

- update Node.js engine requirement to >=24.10.2 and adjust target runtime in documentation ([df497bd](https://github.com/shiftcode/sc-commons-public/commit/df497bd1f776c2ed87feed357838ce1842f5fbba))

### Features

- introduce cdk-utilities ([694454c](https://github.com/shiftcode/sc-commons-public/commit/694454c56da403b523556cce61c9e88e825056b0))

### BREAKING CHANGES

- - node@v24 runtime requires
- require node >= 22.10.2
