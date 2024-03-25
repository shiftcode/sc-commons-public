# TSLint to ESLint mapping


### `tslint-to-eslint-mapping.ts`

this file contains all rules which are contained within `tslint:recommended` and `tslint:latest`, mapped
to their appropriate ESLint rule (whereas they are split into a block of generally applicable JS rules and
TS-specific rules).


### `base_eslintrc.cjs`

contains the configuration for transforming tslint.yml into eslintrc configuration.

> Note: file is outdated in comparison to current @shiftcode/eslint-config-recommended.
