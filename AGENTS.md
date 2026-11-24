# AGENTS.md

## General

- temporary files should be saved to `tmp` folder of this project - do not write to systems root `/tmp`

## Coding

- Consult the file specific [instructions](.github/instructions) when writing code.
- When writing comments, break lines at meaningful points, it's not a goal to fill every line to the max allowed length.

## Workspace

- `packages/airtable-mapper`: interfaces and classes for airtable mapping
- `packages/airtable-syncer`: base utils and services to export airtable and upload to S3
- `packages/branch-utilities`: Utilities for local and ci to get branch name and stage
- `packages/cdk-utilities`: Constructs for iac with aws-cdk-lib
- `packages/eslint-config-recommended`: default shiftcode config for eslint
- `packages/eslint-plugin-rules`: eslint-rules for shiftcode-specific eslint rules
- `packages/iac-utilities`: scripts and util functions for aws iac
- `packages/inversify-logger`: InversifyJS support for the logger package
- `packages/lambda-utilities`: Utils for lambda functions
- `packages/logger`: logger for local and aws lambda execution
- `packages/nest-logger`: NestJS support for the logger package
- `packages/publish-helper`: scripts for conventional (pre)releases
- `packages/utilities`: Contains some utilities
