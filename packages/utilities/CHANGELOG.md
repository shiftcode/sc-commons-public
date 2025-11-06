# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.3.1](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@4.3.0...@shiftcode/utilities@4.3.1) (2025-11-06)

**Note:** Version bump only for package @shiftcode/utilities

# [4.3.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@4.2.0...@shiftcode/utilities@4.3.0) (2025-11-04)

### Features

- replace cjs to mjs files ([de2580a](https://github.com/shiftcode/sc-commons-public/commit/de2580a2b0e8a8da97ac3a0ca884e5467ba91237))

### Reverts

- **tsconfig:** use es2023 ([5a6020e](https://github.com/shiftcode/sc-commons-public/commit/5a6020e2bdaba68ced6108fbc419a0961877ac37))

# [4.2.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@4.1.0...@shiftcode/utilities@4.2.0) (2025-09-09)

### Features

- **object-utilities:** add fn to pick props + assert defined from object ([8880673](https://github.com/shiftcode/sc-commons-public/commit/888067334274a6fcb65197bcc47931360eb96b2f))
- **object-utilities:** add getValueAssertDefined function ([527cfc3](https://github.com/shiftcode/sc-commons-public/commit/527cfc3cc253edba1fcb92aee960d875be47080c))

# [4.1.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@4.0.0...@shiftcode/utilities@4.1.0) (2025-09-09)

### Features

- **utilities:** add basic ts guards to check for a certain type from value ([b98721e](https://github.com/shiftcode/sc-commons-public/commit/b98721efc8ebb83216ce3833538d4bc3cc454a32))

# [4.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@3.0.0...@shiftcode/utilities@4.0.0) (2025-05-15)

### Features

- **package:** specify node version in the individual packages ([78e01d0](https://github.com/shiftcode/sc-commons-public/commit/78e01d0be016e22584a17e7c021cc1b4408c4d1f))

### BREAKING CHANGES

- **package:** Requires Node 20 or >=22

# [3.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@2.2.0...@shiftcode/utilities@3.0.0) (2024-07-13)

### Bug Fixes

- use correct syntax to provide args to npm scripts ([f2353c1](https://github.com/shiftcode/sc-commons-public/commit/f2353c18daeecc44bcbf7c31c29730a06bddc8be))

### Build System

- **deps:** upgrade typescript and minimum required node version ([8417ec4](https://github.com/shiftcode/sc-commons-public/commit/8417ec403de6f33fa50caa96692a29c32c186b0e))

### BREAKING CHANGES

- **deps:** Minimum required node version is 20. In general the runtime (node or browser for utilities) must support es2023.

# [2.2.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@2.1.0...@shiftcode/utilities@2.2.0) (2024-05-15)

### Features

- **eslint:** use globally ([c4dac67](https://github.com/shiftcode/sc-commons-public/commit/c4dac67b437955c0fb67bc69e1cfa8c337092b44))
- pr improvements ([feab565](https://github.com/shiftcode/sc-commons-public/commit/feab5657bb50fb8a60036b512746e14c51c6aa6a))
- **prettier:** over entire project ([ae9754f](https://github.com/shiftcode/sc-commons-public/commit/ae9754fa1267c6f481ef727ba2a8d7dcc0d98f1e))
- **tslint:** remove unused files ([abb2074](https://github.com/shiftcode/sc-commons-public/commit/abb2074c05b363ecff51473eff1a9feacfb534cc))

# [2.1.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@2.0.1...@shiftcode/utilities@2.1.0) (2024-01-23)

### Features

- **clamp:** add clamp function ([890d835](https://github.com/shiftcode/sc-commons-public/commit/890d835c2a631109b96d83a881610c025a6035aa))
- **http-constants:** add Content-Disposition to the CommonHttpHeader enum ([c1475fe](https://github.com/shiftcode/sc-commons-public/commit/c1475fed7fe3b00ea9ada11bf0307e41736d7923))
- **http-constants:** add csv,docx,xlsx,pptx to the ContentType enum ([90cc26b](https://github.com/shiftcode/sc-commons-public/commit/90cc26bc038c7c0ff352ed51fb9609af0aa43a0c))
- **object-utils:** add pick-props and omit-props ([cae2311](https://github.com/shiftcode/sc-commons-public/commit/cae2311ca2d427214039d77280e109d215484789))
- **promise-utils:** add makeDeferred function ([a91f11a](https://github.com/shiftcode/sc-commons-public/commit/a91f11aa6ebc5ea9ff58dd1e98203e39f9127180))
- **string-utils:** add capitalize function ([ed2673f](https://github.com/shiftcode/sc-commons-public/commit/ed2673fb26e9609a10011532b907f5e55b18f3e1))
- **type-utils:** add UnionToIntersection utility type ([f7adab0](https://github.com/shiftcode/sc-commons-public/commit/f7adab04533fa2546e09a792d3ee63f6968c1d6c))

## [2.0.1](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@2.0.0...@shiftcode/utilities@2.0.1) (2022-12-12)

**Note:** Version bump only for package @shiftcode/utilities

# [2.0.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@1.2.0...@shiftcode/utilities@2.0.0) (2022-12-12)

### Features

- update target to 2022 ([d00fd03](https://github.com/shiftcode/sc-commons-public/commit/d00fd03c2e09d620731bf7abca60bf8eeb456e3f))
- **utilities:** start using ESM ([4dddd08](https://github.com/shiftcode/sc-commons-public/commit/4dddd08582b98837fe1dafc5612fe4e137c689d7))
- **utilities:** start using ESM with jest (upgraded to ^29) ([351383b](https://github.com/shiftcode/sc-commons-public/commit/351383b735ab745b68584cc8144170de475ca304))

### BREAKING CHANGES

- minimal node version required is 18 and 2 latest browser versions
- **utilities:** can not be imported from CommonJS modules anymore

# [1.2.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@1.1.0...@shiftcode/utilities@1.2.0) (2022-06-14)

### Features

- **color-utils:** add hexToRgb and colorizeForConsole function ([3fbc35f](https://github.com/shiftcode/sc-commons-public/commit/3fbc35fb22403900f7cb38a395a4e733860aaef1))

# [1.1.0](https://github.com/shiftcode/sc-commons-public/compare/@shiftcode/utilities@1.0.0...@shiftcode/utilities@1.1.0) (2022-06-03)

### Features

- **enum:** add helper function isValueFromEnum ([eefffe3](https://github.com/shiftcode/sc-commons-public/commit/eefffe3c153958c204742311251778b10999dd6c))
- **enum:** getEnumValues for StringEnum now returns correctly typed array instead of string[] ([dd7d0e4](https://github.com/shiftcode/sc-commons-public/commit/dd7d0e4f2396c42a1748075f576cfb633b310a98))

## 1.0.0 (2022-01-10)

**Note:** Version bump only for package @shiftcode/utilities
