# branch-utilities

> 🎯 Target runtime: es2023 ([Node >= 20](https://node.green/#ES2023))

Utilities for branch info depending on env (GitHub Workflow or Local)

## Stage Name Concept

the stageId is extracted from the branchname by the pattern `/^#(\d+)-(.*)/`

- When Master --> `master`
- When Local or nonPr github workflow --> `xx#{stageId}`
- When Github PR --> `pr#{stageId}`
