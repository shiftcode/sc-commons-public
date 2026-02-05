import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

import { Ajv, ValidateFunction } from 'ajv'

// eslint-disable-next-line import/no-internal-modules
import awsSsoProfileConfigSchema from '../json-schemas/aws-sso-profiles-definition-schema.json' with { type: 'json' }

export const DEFAULT_PATH_TO_AWS_SSO_CONFIG = '/aws/sso.config.json'

export const AWS_SSO_CONFIG_SCHEMA_NAME = '@shiftcode/iac-helper/aws-sso-profile-config-schema.json'

type AwsSsoConfigDefSchemaName = `${string}${typeof AWS_SSO_CONFIG_SCHEMA_NAME}`

type AwsSsoProfileStage = 'prod' | 'dev'

type SsoProfile = {
  /* eslint-disable @typescript-eslint/naming-convention */
  sso_session: string
  sso_account_id: string
  sso_role_name: string
  region: string
  output: string
  /* eslint-enable @typescript-eslint/naming-convention */
}

/**
 * this type reflects the json schema of {@link ./aws-sso-profile-config-schema.json}
 */
interface AwsSsoProfileConfig {
  $schema: AwsSsoConfigDefSchemaName
  profileByStage: Record<AwsSsoProfileStage, string>
  profiles: Record<string, SsoProfile>
}

export interface AwsConfigureProfilesOptions {
  config: string
  verbose: boolean
}

const info: Console['log'] = (...a: any[]) => console.log('awsSsoCopyConfig ::', ...a)

/**
 * ensures the aws cli is installed
 */
export function assertAWSCliInstalled() {
  try {
    execSync('aws --version')
    return true
  } catch {
    throw new Error('Unable to execute "aws --version" - Do you have the AWS CLI installed?')
  }
}

/**
 * reads the config file from the given path and validates it against the JSON schema
 * @param path
 */
async function readConfigFile(path: string): Promise<AwsSsoProfileConfig> {
  if (!existsSync(path)) {
    throw new Error(`AWS SSO config file '${path}' does not exist.`)
  }
  const file = await readFile(path, 'utf8')
  const parsed = JSON.parse(file)

  const schemaValidator: ValidateFunction<AwsSsoProfileConfig> = new Ajv({ allErrors: true, strict: 'log' }).compile(
    awsSsoProfileConfigSchema,
  )
  const valid = schemaValidator(parsed)

  if (valid) {
    // ensure the values in profileByStage point to valid profile definitions
    const allProfiles = Object.keys(parsed.profiles)
    if (Object.values(parsed.profileByStage).some((profileName) => !allProfiles.includes(profileName))) {
      throw new Error(
        `At least one profile is referenced in the profileByStage section but not defined in the profiles section`,
      )
    }

    return parsed
  }

  info('invalid definitions file:', schemaValidator.errors)
  throw new Error(`Config file does not match schema`)
}

export async function configureAwsProfiles(
  options: AwsConfigureProfilesOptions | Promise<AwsConfigureProfilesOptions>,
) {
  const opts = await options
  const log: Console['log'] = opts.verbose ? (...a: any[]) => console.log('awsSsoCopyConfig ::', ...a) : () => {}

  // make sure the aws cli is installed
  assertAWSCliInstalled()
  log(`AWS CLI installation verified`)

  const awsSsoConfig = await readConfigFile(opts.config ?? DEFAULT_PATH_TO_AWS_SSO_CONFIG)
  log(`AWS SSO config file loaded from '${opts.config}'`, JSON.stringify(awsSsoConfig, undefined, 2))

  for (const [profileName, profileSettings] of Object.entries(awsSsoConfig.profiles)) {
    if (profileSettings) {
      for (const [key, value] of Object.entries(profileSettings)) {
        const command = `aws configure set profile.${profileName}.${key} ${value}`
        log(`executing: ${command}`)
        execSync(command)
      }
    }
  }

  const existingProfiles = execSync('aws configure list-profiles').toString().split('\n')
  existingProfiles.pop() // remove last empty line
  info(
    'AWS profiles added to your local AWS CLI configuration (~/.aws/config). You now have the following profiles in your config:',
  )
  for (const profile of existingProfiles) {
    info(`- ${profile}`)
  }
  return 'DONE'
}

export async function resolveActiveProfile(
  isProd: boolean,
  configFilePath = DEFAULT_PATH_TO_AWS_SSO_CONFIG,
): Promise<SsoProfile & { profileName: string }> {
  const stage = isProd ? 'prod' : 'dev'
  const configFile = await readConfigFile(configFilePath)
  info('configFile', configFile)

  const ssoProfileName = configFile.profileByStage[stage]

  const activeSsoProfile = configFile.profiles[ssoProfileName]
  if (!activeSsoProfile) {
    throw new Error(
      `No profile found for stage ${stage}, existing stages are ${Object.keys(configFile.profileByStage).join(', ')}`,
    )
  }

  return { ...activeSsoProfile, profileName: ssoProfileName }
}
