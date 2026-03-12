import { Ajv, ValidateFunction } from 'ajv'
import { beforeEach, describe, expect, test } from 'vitest'

// eslint-disable-next-line import/no-internal-modules
import s3DefinitionSchema from '../src/json-schemas/s3-upload-definition-schema.json' with { type: 'json' }
import invalidS3UploadDefinition from './invalid-s3-upload-definition.json' with { type: 'json' }
import validS3UploadDefinition from './valid-s3-upload-definition.json' with { type: 'json' }

describe('s3UploadDefinitionSchema', () => {
  let schemaValidator: ValidateFunction<any>

  beforeEach(() => {
    schemaValidator = new Ajv({ allErrors: true }).compile(s3DefinitionSchema)
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
