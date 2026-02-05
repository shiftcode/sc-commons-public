export function isAwsLambdaEnv(): boolean {
  // aws sets the AWS_EXECUTION_ENV so does the serverless framework -
  // to detect local invocations SLS additionally sets IS_LOCAL env var
  return process && !!process.env['AWS_EXECUTION_ENV'] && !process.env['IS_LOCAL']
}
