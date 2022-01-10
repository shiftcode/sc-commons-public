# sc-commons-public
public helper packages with commonly used utilities

## Quick Start
* `yarn`
* `yarn build`
* start developing


## Versioning
When opening a PR lerna publishes a new prerelease version with the preId `-prXX.{COUNT}`.
By creating this version lerna creates a commit with the updated versions in the package.json. It does not update the `peerDependencies` versions.

After merging the PR back to the master a new release is published with the graduated version (eg. `1.0.1-pr55.7` -> `1.0.1`).

### Hint
If it happens that you already have another commit locally, before updating the branch with this `build(release):..` commit:
> use `rebase` instead of `merge`


## Anatomy of the repo

We use lerna to manage the packages.
- For lerna to know the topological order of packages, we define the dependencies between the packages in each individual package as `devDependency`
- For testing reasons we compile against the source code to run tests without prior compiling of the source, this requires `tsconfig.paths` definitions and also `moduleNameMapper` in `jest.config.js`


## es2019 vs. es2017
es2019 is supported 100% in node 14.x (basically already 12.x), so we mostly compile against es2019 since AWS Lambda supports node 14.x as runtime,
but be aware: For usage in browsers the `@shiftcode/utilities` is still built with target es2017.


## Packages
* [branch-utilities](packages/branch-utilities/README.md)
* [publish-helper](packages/publish-helper/README.md)
* [utilities](packages/utilities/README.md)
