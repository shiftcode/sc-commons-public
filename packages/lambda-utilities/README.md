# lambda-utilities

> 🎯 Target runtime: es2023 ([Node >= 22](https://node.green/#ES2023))

This package contains utilities for AWS Lambda functions.

## Exports

### Main Export

Import from `@shiftcode/lambda-utilities`

- **HttpResponse** - Response builder for API Gateway Lambda functions
- **isAwsLambdaEnv** - Detect if running in AWS Lambda environment

**Required peer dependencies:**

- `@shiftcode/utilities`
- `@types/aws-lambda`

### Deep Imports

#### S3 Helper

Import from `@shiftcode/lambda-utilities/s3`

- **S3Helper** - Injectable service for S3 operations (list, upload, download)

**Required peer dependencies:**

- `@aws-sdk/client-s3`
- `@shiftcode/inversify-logger`
- `@shiftcode/logger`
- `inversify`
- `reflect-metadata`

#### SSM Parameters

Import from `@shiftcode/lambda-utilities/ssm`

- **fetchSsmStringParamValue** - Fetch SSM parameters via Lambda extension layer

**Required peer dependencies:**

- `@aws-sdk/client-ssm`
