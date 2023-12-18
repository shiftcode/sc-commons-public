# eslint-plugin

> 🎯 Target runtime: es2022 ([Node >= 18](https://node.green/#ES2022))

> ⚠️ This module exports code using CommonJS

This module holds some custom eslint plugins written in typescript. See [doc](https://typescript-eslint.io/custom-rules)
for instructions on how to create custom plugins using `typescript-eslint`.

## usage

sample .eslintrc.js file:

```javascript
module.exports = {
  // ...

  overrides: [
    {
      plugins: ['@shiftcode'],
      files: ['*.ts'],
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
            ]
          }
        ],
      },
    },
  ],

  // ...
}
```

### provided rules

the following custom rules are provided within this module:

> deny-parent-index-file-import

- imports from parent index files are not allowed; i.e. ``import { stuff } from '..'``
- <span style="color: orange">note: this rule is already included by [eslint-config](../eslint-configuration)</span>

> import-denylist

This can potentially be replaced by using [no-restricted-imports](https://eslint.org/docs/latest/rules/no-restricted-imports)

- rule accepts a config-object with a ``patterns`` regexp array and is the pendant of the former tslint rule "import-blacklist".
- example configuration: see above
