import * as parser from '@typescript-eslint/parser'
import { RuleTester } from '@typescript-eslint/rule-tester'
import * as vitest from 'vitest'

// https://typescript-eslint.io/packages/rule-tester/#vitest
// since we don't want to use vitest with globals
RuleTester.afterAll = vitest.afterAll
RuleTester.it = vitest.it
RuleTester.itOnly = vitest.it.only
RuleTester.describe = vitest.describe

export function createRuleTester(): RuleTester {
  return new RuleTester({
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2023,
        tsconfigRootDir: import.meta.dirname,
        project: './tsconfig.json',
      },
    },
  })
}
