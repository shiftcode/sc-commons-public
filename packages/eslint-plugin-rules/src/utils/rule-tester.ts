import { join } from 'node:path'

import * as parser from '@typescript-eslint/parser'
import { RuleTester } from '@typescript-eslint/rule-tester'

const tsRootDirectory = join(__dirname, '../..', 'test')

export function createRuleTester(): RuleTester {
  return new RuleTester({
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2023,
        tsconfigRootDir: tsRootDirectory,
        project: './tsconfig.json',
      },
    },
  })
}
