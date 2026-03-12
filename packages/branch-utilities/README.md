# branch-utilities

> 🎯 Target runtime: es2024 ([Node >= 24](https://node.green/#ES2024))

Utilities for branch info depending on env (GitHub Workflow or Local)

## Stage Name Concept

the stageId is extracted from the branchname by the pattern `/^#(\d+)-(.*)/`

- When Master --> `master`
- When Local or nonPr github workflow --> `xx#{stageId}`
- When Github PR --> `pr#{stageId}`
