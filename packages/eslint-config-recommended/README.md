# @shiftcode/eslint-config-recommended

> 🎯 Target runtime: es2022 ([Node >= 18](https://node.green/#ES2022))

> ⚠️ This module exports code using CommonJS

This module provides an eslint default rule-set configuration for shiftcode projects.

### remark

by using this module, the [@shiftcode/eslint-plugin-rules](../eslint-plugin-rules) module will be automatically included too.

## usage

sample .eslintrc.js file:

```javascript
module.exports = {
  // ...
    
  // all child eslintrc configs from workspace packages inherit this extension
  extends: [
    '^shiftcode',
  ],
  
  // ...
}
```

## provided configurations

the following provided configurations might be included:

- ``@shiftcode/recommended``: rule-set for common javascript and typescript files
- ``@shiftcode/recommended/ng-config``: angular-specific rule-set for angular apps

## Optional Peer Dependencies
All the optional peer dependencies (`@angular-eslint/*`) are only required if the [ng-config](./src/ng-config/index.ts)
is used

## Ideas

it could be useful to create another configuration (i.e. ``shiftcode/node-config``)
used within services/backend workspaces, because the naming conventions aren't really the same as for a client workspace.

Examples:
- const PEdgeLabel = ...
- export const JwtGuardConfig = ...
- const { TextP } = process
- export function VersionedITOf<T,K> { ... }
- etc.
