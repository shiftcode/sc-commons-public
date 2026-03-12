# iac-utilities

> 🎯 Target runtime: es2024 ([Node >= 24](https://node.green/#ES2024))

Utilities for build and runtime to work with the [AWS-CDK](https://aws.amazon.com/de/cdk/).

## necessary peer dependencies

- `@aws-sdk/client-...`
- `@shiftcode/branch-utilities`
- `tslib`

## optional peer dependencies

- `@aws-sdk/client-cloudformation`
  - `exportStackOutputs`
- `@aws-sdk/client-cloudfront`
  - `invalidateCfCache`
- `@aws-sdk/credential-providers` & `@aws-sdk/types`
  - `credentials-helper`
- `@shiftcode/lambda-utilities`
  - `uploadToS3`
- `@aws-sdk/client-s3`
  - `uploadToS3`

## Scripts

### aws-env-vars

- **Purpose**: Resolve and provide AWS environment variables from a configuration file.
- **Usage**: `npm run aws-env-vars -c <path>`, most commonly used with `eval "$(npm run aws-env-vars -c <path>)"`.
- **Args**:

  | Arg                   | Description                                                              | Optional |
  | --------------------- | ------------------------------------------------------------------------ | -------- |
  | `-c, --config <path>` | Relative path to the config file (default: `./aws-accounts.config.json`) | Yes      |

- **Output**: Prints AWS environment variable exports or errors.
  - exports `AWS_REGION` and `SC_AWS_ACCOUNT_ID` for the github action.
  - exports `AWS_REGION` and `AWS_PROFILE` for the local development.

### stage-override-to-pr-base

- **Purpose**: Override the stage to the base of the current pr. (Only works in a GitHub action context.)
- **Usage**: `npm run stage-override-to-pr-base`
- **Args**: None
- **Output**: Prints the environment variable exports for the stage override or errors
  - exports `SC_OVERRIDE_BRANCH_NAME` and `SC_OVERRIDE_IS_PR`
