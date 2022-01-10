# branch-utils

> 🎯 Target runtime: es2019 ([Node >= 12](https://node.green/#ES2019))

Utilities for branch info depending on env (Github Workflow or Local)

## Stage Name Concept

the stageId is extracted from the branchname by the pattern `/^#(\d+)-(.*)/`

- When Master --> `master`
- When Local or nonPr github workflow --> `xx#{stageId}`
- When Github PR --> `pr#{stageId}`
