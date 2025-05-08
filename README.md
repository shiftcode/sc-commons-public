# sc-commons-public

Public helper packages with commonly used utilities / helpers.


>[![@shiftcode/branch-utilities](https://img.shields.io/github/package-json/v/shiftcode/sc-commons-public?filename=packages%2Fbranch-utilities%2Fpackage.json&label=%40shiftcode%2Fbranch-utilities)](packages/branch-utilities) \
>functions to read information about the current branch either locally or inside Github actions.

>[![@shiftcode/eslint-config-recommended](https://img.shields.io/github/package-json/v/shiftcode/sc-commons-public?filename=packages%2Feslint-config-recommended%2Fpackage.json&label=%40shiftcode%2Feslint-config-recommended)](packages/eslint-config-recommended) \
>Our recommended config for eslint. We provide two versions, one for usage in node projects and one for Angular.

>[![@shiftcode/eslint-plugin-rules](https://img.shields.io/github/package-json/v/shiftcode/sc-commons-public?filename=packages%2Feslint-plugin-rules%2Fpackage.json&label=%40shiftcode%2Feslint-plugin-rules)](packages/eslint-plugin-rules) \
>Contains some custom es lint rules. Those are used in our recommended eslint config.
 
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
* `npm i`
* `npm run build`
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

## ES Version
We support two runtimes: `node` and `latest browser versions`.

### Node 22
Node 22 (which is also supported by AWS Lambda) supports [97%](https://node.green/#ES2022) of `es2022` features 
(no version supports 100%) and [100%](https://node.green/#ES2023) of `es2023` features.
The only `es2022` feature that is currently not supported and needs a polyfill when using it is
[RegExp Match Indices (shows up in flags)](https://node.green/#ES2022-features-RegExp-Match-Indices---hasIndices-----d--flag-) (see [2ality blog](https://2ality.com/2019/12/regexp-match-indices.html) for insights). 
Polyfill can be found here: https://www.npmjs.com/package/regexp-match-indices.

### Browser
For modern browsers the latest fully supported version is `es2023` (see [can-i-use](https://caniuse.com/?search=es2023))
which therefore is the target for `@shiftcode/utilities` package (see [package README](./packages/utilities/README.md)).
