# branch-utilities

> 🎯 Target runtime: es2024 ([Node >= 24](https://node.green/#ES2024))

Utilities for branch info depending on env (GitHub Workflow or Local)

## Stage Name Concept

the stageId is extracted from the branchname by the pattern `/^#?(\d+)-(.*)/`

- When Master --> `master`
- When `main` --> `main`
- When Local or nonPr github workflow --> `xx#{stageId}`
- When Github PR --> `pr#{stageId}`
- the `#` is optional in the branchname; if present, it is stripped from the stageId.
- the branch name may contain a directory like prefix, e.g. `feature/#72-ok` or `copilot/123-fix-a-thing`
