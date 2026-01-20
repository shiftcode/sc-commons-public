
export function isAwsLambdaEnv(): boolean {
  // aws sets the AWS_EXECUTION_ENV
  return typeof globalThis.process !== 'undefined' && !!globalThis.process.env?.['AWS_EXECUTION_ENV']
}
