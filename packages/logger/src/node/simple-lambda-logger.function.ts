import { LogLevel } from '../model/log-level.enum.js'
import { createConsoleLogger } from './create-console-logger.function.js'

function isAwsLambdaEnv(): boolean {
  const env = globalThis.process?.env
  // aws sets the AWS_EXECUTION_ENV so does the serverless framework -
  // to detect local invocations SLS additionally sets IS_LOCAL env var
  return !!(env?.['AWS_EXECUTION_ENV'] && !env?.['IS_LOCAL'])
}

/**
 * Creates a {@link Logger} instance
 * with either {@link ConsoleJsonLogTransport} when running in AWS Lambda or {@link NodeConsoleLogTransport} otherwise.
 */
export function simpleLambdaLogger(name: string, logLevel: LogLevel = LogLevel.DEBUG) {
  const isLambda = isAwsLambdaEnv()
  return createConsoleLogger(name, { json: { logLevel }, node: { logLevel } }, isLambda ? 'json' : 'node')
}
