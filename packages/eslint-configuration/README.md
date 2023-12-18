# eslint-configuration

> 🎯 Target runtime: es2022 ([Node >= 18](https://node.green/#ES2022))

> ⚠️ This module exports code using CommonJS

This module provides an eslint default rule-set configuration for shiftcode projects.\
( currently, it is verified against mt-fadas - further projects coming soon )

### remark

by using this module, the [eslint-rules](../eslint-rules) module will be automatically included too.

## usage

sample .eslintrc.js file:

```javascript
module.exports = {
  // ...
    
  // all child eslintrc configs from workspace packages inherit this extension
  extends: [
    '@shiftcode/eslint-configuration',
  ],
  
  // ...
}
```

## provided configurations

the following provided configurations might be included:

- ``@shiftcode/eslint-configuration``: rule-set for common javascript and typescript files
- ``@shiftcode/eslint-configuration/ng-config``: angular-specific rule-set for angular apps

## Optional Peer Dependencies
All the optional peer dependencies (`@angular-eslint/*`) are only required if the [ng-config](./src/ng-config/index.ts)
is used

## Ideas

it could be useful to create another configuration (i.e. ``@shiftcode/eslint-configuration/node-config``)
used within services/backend workspaces, because the naming conventions aren't really the same as for a client workspace.

Examples:
- const PEdgeLabel = ...
- export const JwtGuardConfig = ...
- const { TextP } = process
- export function VersionedITOf<T,K> { ... }
- etc.
