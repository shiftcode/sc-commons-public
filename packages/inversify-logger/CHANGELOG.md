# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/logger-inversify@1.1.0...@shiftcode/logger-inversify@2.0.0) (2025-05-19)

### Features

- update @shiftcode/logger to version ^3.0.0 and @shiftcode/utilities to version ^4.0.0 ([2e5f2d1](https://github.com/shiftcode/sc-commons/commit/2e5f2d1a78882b8885aacd7bab56b8733a13b7d6))

### BREAKING CHANGES

- requires @shiftcode/logger ^3.0.0,
  requires @shiftcode/utilities ^4.0.0

# 1.1.0 (2025-05-14)

### Bug Fixes

- **build:** update @shiftcode/logger to use caret versioning ([99a86c7](https://github.com/shiftcode/sc-commons/commit/99a86c78d916688964566ed9a116518ebb051e26))
- **logger-inversify:** remove logger factory due to its support being removed in inversify^7.0.0 ([89cc94b](https://github.com/shiftcode/sc-commons/commit/89cc94b1b660523b6e9b094fddbbb92af7359756))
- **logger-inversify:** resolve issues related to inversify^7.0.0 update ([720aff0](https://github.com/shiftcode/sc-commons/commit/720aff09dcec5f167934f7d929cde1ce1bb88111))
- **logger-inversify:** use mock log transport for tests ([20b7841](https://github.com/shiftcode/sc-commons/commit/20b7841b38b71b842beb00cdd590ff7474516bb8))
- **nest-logger/inversify:** include packages into ci ([a997895](https://github.com/shiftcode/sc-commons/commit/a9978954d28a24fe1393b9f754ea109b5d5e1253))

### Features

- **log-transports:** update ConsoleJsonLogTransport to extend json log transport from base logger ([dd7566d](https://github.com/shiftcode/sc-commons/commit/dd7566dff1a728f7b5dc72d89dd77b2e57defcb1))
- **logger:** add package to support the usage of inversify for the new logger ([a1967a3](https://github.com/shiftcode/sc-commons/commit/a1967a3308bb7c4078958650839b107adfaae121))
- **logger:** add package to support the usage of nest for the new logger ([d4798b0](https://github.com/shiftcode/sc-commons/commit/d4798b07422709cd51f1f2ed13ebd20b77232de1))
- **logger:** move logger to public repo and rename to log transports package ([1eea87c](https://github.com/shiftcode/sc-commons/commit/1eea87c237033bc734a74ad75c3b87f8419c5dec))
- update @shiftcode/logger to version 1.1.0 ([b196b95](https://github.com/shiftcode/sc-commons/commit/b196b95dbe3757d2b6efd9d5203e21aa82a7891e))
