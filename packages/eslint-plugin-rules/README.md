# @shiftcode/eslint-plugin-rules

> 🎯 Target runtime: es2023 ([Node >= 20](https://node.green/#ES2023))

This module holds some custom eslint plugins written in typescript. See [doc](https://typescript-eslint.io/custom-rules)
for instructions on how to create custom plugins using `typescript-eslint`.

## usage

sample `eslint.config.msj` file:

```javascript
import eslintScPlugin from '@shiftcode/eslint-plugin-rules'

export default defineConfig(
  // ...
    {
      files: ['*.ts'],
      extends: [eslintScPlugin.configs.recommended],
      rules: {
        '@shiftcode/import-denylist': [ // former TSLint rule: "import-blacklist"
          'error',
          {
            patterns: [
              /aws-cdk-lib\/core/,
              /\.\/(core|models|shared|static)\/.*/, // use app/* instead
              /^app\/core/,    // disallow importing from self
              /^somewhat\/.*/, // import filename must never start with "somewhat"
              /example$/,      // import filename must never end with "example"
              // etc ...
            ],
          },
        ],
      },
    },

  // ...
)
```

alternative you can configure the plugin like this:

```js
export default defineConfig({
  
})
```

## Rules

the following custom rules are provided within this module:

### deny-parent-index-file-import

- imports from parent index files are not allowed; i.e. `import { stuff } from '..'`
- <span style="color: orange">note: this rule is already included by [@shiftcode/eslint-config-recommended](../eslint-config-recommended)</span>

### import-denylist

This can potentially be replaced by using [no-restricted-imports](https://eslint.org/docs/latest/rules/no-restricted-imports)

- rule accepts a config-object with a `patterns` regexp array and is the pendant of the former tslint rule "import-blacklist".
- example configuration: see above

### prefix-builtin-module-import
This rule ensures all node builtin modules are imported with the `node:` prefix.

- <span style="color: orange">note: this rule is already included by [@shiftcode/eslint-config-recommended](../eslint-config-recommended)</span>


✅ Correct
```js
import { writeFile } from 'node:fs/promises'
import crypto from 'node:crypto'
```
❌ Incorrect
```js
import { writeFile } from 'fs/promises'
import crypto from 'crypto'
```
