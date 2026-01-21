import { LogLevel } from '../model/log-level.enum.js'
import { createConsoleLogger } from './create-console-logger.function.js'

function isAwsLambdaEnv(): boolean {
  const env = globalThis.process?.env
  // aws sets the AWS_EXECUTION_ENV so does the serverless framework -
  // to detect local invocations SLS additionally sets IS_LOCAL env var
  return !!(env?.['AWS_EXECUTION_ENV'] && !env?.['IS_LOCAL'])
}

export function simpleLambdaLogger(name: string, logLevel: LogLevel = LogLevel.DEBUG) {
  const isLambda = isAwsLambdaEnv()
  return createConsoleLogger(name, logLevel, isLambda ? 'json' : 'node')
}
