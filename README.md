# sc-commons-public

Public helper packages with commonly used utilities / helpers.


>[![@shiftcode/branch-utilities](https://img.shields.io/github/package-json/v/shiftcode/sc-commons-public?filename=packages%2Fbranch-utilities%2Fpackage.json&label=%40shiftcode%2Fbranch-utilities)](packages/branch-utilities) \
>functions to read information about the current branch either locally or inside Github actions.

 
>[![@shiftcode/publish-helper](https://img.shields.io/github/package-json/v/shiftcode/sc-commons-public?filename=packages%2Fpublish-helper%2Fpackage.json&label=%40shiftcode%2Fpublish-helper)](packages/publish-helper)\
>scripts to prepare and publish libs inside mono-repos with lerna

>[![@shiftcode/utilities](https://img.shields.io/github/package-json/v/shiftcode/sc-commons-public?filename=packages%2Futilities%2Fpackage.json&label=%40shiftcode%2Futilities)](packages/utilities)\
>various utility functions, constants and helper types - usable in Node and Browsers

## Usage
Add a `.npmrc` file to the root of your project:
```
@shiftcode:registry=https://npm.pkg.github.com
```

## Quick Start
* `yarn`
* `yarn build`
* start developing


## Versioning
When opening a PR lerna publishes a new prerelease version with the preId `-prXX.{COUNT}`.
By creating this version lerna creates a commit with the updated versions in the package.json. It does not update the `peerDependencies` versions.

After merging the PR back to the master a new release is published with the graduated version (eg. `1.0.1-pr55.7` -> `1.0.1`).

> ensure your branch is named correctly by the convention `#XX-name` where `XX` is your github issue number.

### Hint
If it happens that you already have another commit locally, before updating the branch with this `build(release):..` commit:
> use `rebase` instead of `merge`


## Anatomy of the repo

We use lerna to manage the packages.
- For lerna to know the topological order of packages, we define the dependencies between the packages in each individual package as `devDependency`
- For testing reasons we compile against the source code to run tests without prior compiling of the source, this requires `tsconfig.paths` definitions and also `moduleNameMapper` in `jest.config.js`


## es2021
`es2021` is supported 100% in node^18 (see [node.green](https://node.green/#ES2021)) and also in browsers, which is 
relevant for `@shiftcode/utilities` package (see [can-i-use](https://caniuse.com/?feats=mdn-javascript_builtins_string_replaceall,mdn-javascript_builtins_promise_any,mdn-javascript_builtins_weakref,mdn-javascript_operators_logical_or_assignment,mdn-javascript_operators_logical_and_assignment,mdn-javascript_operators_logical_nullish_assignment,mdn-javascript_grammar_numeric_separators,mdn-javascript_builtins_finalizationregistry))). AWS Lambda also supports node ^18.
