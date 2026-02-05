import { execSync } from 'node:child_process'

import { fromSSO } from '@aws-sdk/credential-providers'
import { Credentials } from '@aws-sdk/types'

/*
 * Credential helper to export temporary credentials from AWS SSO to AWS SDK v2 based tools like aws-cdk.
 * This package can be removed once https://github.com/aws/aws-cdk/issues/5455 is closed
 * and all our internal tools are using v3 AWS JS SDK.
 * You can use it as credential_process inside the aws config.
 */
export async function credentialsInit(profile: string | undefined) {
  if (!profile) {
    throw new Error('You have to provide a profile as first arg')
  }
  try {
    if (isAWSCliInstalled()) {
      const result = await fromSSO({ profile })()
      writeKeys(result, profile, true)
    }
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'message' in e && String(e.message).indexOf('run aws sso login') !== -1) {
      execSync(`aws sso login --profile ${profile}`)
      await credentialsInit(profile)
    } else {
      throw e
    }
  }
}

function isAWSCliInstalled(): boolean {
  try {
    execSync('aws --version')
    return true
  } catch {
    throw new Error('Unable to execute "aws --version" - Do you have the AWS CLI installed?')
  }
}

function writeKeys(credentials: Credentials, profile: string, toConsole = false) {
  if (toConsole) {
    console.log(
      JSON.stringify({
        Version: 1,
        AccessKeyId: credentials.accessKeyId,
        SecretAccessKey: credentials.secretAccessKey,
        SessionToken: credentials.sessionToken,
        Expiration: credentials.expiration?.toISOString(),
      }),
    )
  } else {
    execSync(`aws configure set --profile active_SSO-${profile} aws_access_key_id ${credentials.accessKeyId}`)
    execSync(`aws configure set --profile active_SSO-${profile} aws_secret_access_key ${credentials.secretAccessKey}`)
    execSync(`aws configure set --profile active_SSO-${profile} aws_session_token ${credentials.sessionToken}`)
  }
}
