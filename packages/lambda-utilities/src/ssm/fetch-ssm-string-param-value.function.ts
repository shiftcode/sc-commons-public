import process from 'node:process'

import { GetParameterResult } from '@aws-sdk/client-ssm'

/**
 * Fetches a ssm String/SecureString parameter through the lambda layer. See https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-integration-lambda-extensions.html for more information on how to setup/configure the lambda layer.
 *
 * ATTENTION: Do NOT call this method outside (before) the handler method in lambda functions as the layer might not be ready to take the request yet. Results are cached, so you do not have to worry about performance.
 *
 * @param parameterArn ARN of the ssm parameter to fetch
 * @param withDecryption Whether to decrypt the parameter (needed for SecureString parameters)
 */
export async function fetchSsmStringParamValue(parameterArn: string, withDecryption: boolean): Promise<string> {
  const sessionToken = process.env.AWS_SESSION_TOKEN
  const port = process.env.PARAMETERS_SECRETS_EXTENSION_HTTP_PORT
  if (!sessionToken || !port) {
    throw new Error(
      `No session token (AWS_SESSION_TOKEN) or port (PARAMETERS_SECRETS_EXTENSION_HTTP_PORT) found in the environment.`,
    )
  }

  const parameterUrl = `http://localhost:${port}/systemsmanager/parameters/get/?name=${encodeURIComponent(
    parameterArn,
  )}&withDecryption=${withDecryption}`

  try {
    const response = await fetch(parameterUrl, {
      method: 'GET',
      headers: {
        'X-Aws-Parameters-Secrets-Token': sessionToken,
      },
    })

    const result: GetParameterResult = await response.json()
    if (!result?.Parameter?.Value) {
      throw new Error(
        `No value found for ssm parameter ${parameterArn} with local url: ${parameterUrl} via lambda layer.`,
      )
    }
    return result.Parameter.Value
  } catch (e) {
    throw new Error(`Error fetching ssm parameter ${parameterArn} with local url ${parameterUrl} via lambda layer.`, {
      cause: e,
    })
  }
}
