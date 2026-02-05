import { Ajv, ValidateFunction } from 'ajv'
import { beforeEach, describe, expect, test } from 'vitest'

// eslint-disable-next-line import/no-internal-modules
import awsSssoProfilesSchema from '../src/json-schemas/aws-sso-profiles-definition-schema.json' with { type: 'json' }
import invalidS3UploadDefinition from './invalid-aws-sso-profiles-definition.json' with { type: 'json' }
import validS3UploadDefinition from './valid-aws-sso-profiles-definition.json' with { type: 'json' }

describe('AWS SSO profiles configuration ', () => {
  let schemaValidator: ValidateFunction<any>

  beforeEach(() => {
    const a = new Ajv({ allErrors: true })
    schemaValidator = a.compile(awsSssoProfilesSchema) // recompile to reset errors on
  })

  test('no error when correct', () => {
    const valid = schemaValidator(validS3UploadDefinition)
    expect(schemaValidator.errors).toBe(null)
    expect(valid).toBe(true)
  })

  test('has errors when incorrect', () => {
    const valid = schemaValidator(invalidS3UploadDefinition)
    expect(valid).toBe(false)
    expect(schemaValidator.errors).toBeInstanceOf(Array)
    expect(schemaValidator.errors?.length).toBe(2)
  })
})
