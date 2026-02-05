import { describe, expect, test } from 'vitest'

import { createJson } from './export-stack-outputs.function.js'

describe('export stack outputs', () => {
  test('create correct json', () => {
    const json = JSON.parse(
      createJson([
        {
          Description: 'description',
          OutputKey: 'Some-Output-Key',
          OutputValue: 'Some-Output-Value',
          ExportName: 'ExportName',
        },
      ]),
    )
    expect(json).toEqual({ CFO_SOME_OUTPUT_KEY: 'Some-Output-Value' })
  })
})
