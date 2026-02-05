# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/shiftcode/sc-commons/compare/@shiftcode/logger-nest@1.1.0...@shiftcode/logger-nest@2.0.0) (2025-05-19)

### Features

- update @shiftcode/logger to version ^3.0.0 and @shiftcode/utilities to version ^4.0.0 ([2e5f2d1](https://github.com/shiftcode/sc-commons/commit/2e5f2d1a78882b8885aacd7bab56b8733a13b7d6))

### BREAKING CHANGES

- requires @shiftcode/logger ^3.0.0,
  requires @shiftcode/utilities ^4.0.0

# 1.1.0 (2025-05-14)

### Bug Fixes

- **build:** update @shiftcode/logger to use caret versioning ([99a86c7](https://github.com/shiftcode/sc-commons/commit/99a86c78d916688964566ed9a116518ebb051e26))
- **logger-nest/inversify:** include packages into ci ([a997895](https://github.com/shiftcode/sc-commons/commit/a9978954d28a24fe1393b9f754ea109b5d5e1253))
- **logger-nest:** add test for injected instances ([88d4585](https://github.com/shiftcode/sc-commons/commit/88d4585ab3c012f3e7c736f71ab82565f3c07472))
- **logger-nest:** define Logger provider scope as transient ([45e8739](https://github.com/shiftcode/sc-commons/commit/45e8739285ee1806dd9dd8caa04cafdc46456c97))

### Features

- **log-transports:** update ConsoleJsonLogTransport to extend json log transport from base logger ([dd7566d](https://github.com/shiftcode/sc-commons/commit/dd7566dff1a728f7b5dc72d89dd77b2e57defcb1))
- **logger-nest:** change rxjs peer dependency to the lowest necessary ([80f120f](https://github.com/shiftcode/sc-commons/commit/80f120f1f065a7eafd58d1a5c954dd85bcd28733))
- **logger-nest:** define LoggerModule as global module ([e524465](https://github.com/shiftcode/sc-commons/commit/e524465e729e17eb8f184846bcd6af01e368d3da))
- **logger-nest:** enhance transport configuration with type safety ([4476cca](https://github.com/shiftcode/sc-commons/commit/4476ccaf0195e7789f7f27856afca7e8ae70b790))
- **logger-nest:** implemented NestLogger to support providing logger to NestApplication ([ace0501](https://github.com/shiftcode/sc-commons/commit/ace050117b1408d1d755c881b13ed6a7cf647cce))
- **logger:** add package to support the usage of nest for the new logger ([d4798b0](https://github.com/shiftcode/sc-commons/commit/d4798b07422709cd51f1f2ed13ebd20b77232de1))
- **logger:** move logger to public repo and rename to log transports package ([1eea87c](https://github.com/shiftcode/sc-commons/commit/1eea87c237033bc734a74ad75c3b87f8419c5dec))
- update @shiftcode/logger to version 1.1.0 ([b196b95](https://github.com/shiftcode/sc-commons/commit/b196b95dbe3757d2b6efd9d5203e21aa82a7891e))
