# @shiftcode/eslint-config-recommended

> 🎯 Target runtime: es2023 ([Node >= 20](https://node.green/#ES2023))

This module provides an eslint default rule-set configuration for shiftcode projects.

### remark

By using this module, the [@shiftcode/eslint-plugin-rules](../eslint-plugin-rules) module will be automatically installed
as dependency.

## usage

the module only exports a single function `defineScTsConfig` which can be used to create the eslint configuration.
it is basically a wrapper around the new eslint `defineConfig` function but already includes the setup for typescript,
some rules with default configurations and will ensure the prettier rules (disabling formatting rules) are included at last.

sample `eslint.config.mjs`:

```js
import { defineScTsConfig } from '@shiftcode/eslint-config-recommended'

export default defineScTsConfig(
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: { project: ['./tsconfig.json', './tsconfig.spec.json'] },
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
)
```

## Additional configurations

Additionally on the submodule `/angular` the `defineScAngularConfig` function is exported
which includes angular-specific rules and configurations.

```js
import { defineScAngularConfig } from '@shiftcode/eslint-config-recommended/angular'

export default defineScAngularConfig(
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.spec.json'],
      },
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'gf', style: 'kebab-case' }],
    },
  },
)
```

when using the angular configuration, the peer dependency `angular-eslint` is required.
