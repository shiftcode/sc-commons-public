import { RuleTester } from '@typescript-eslint/rule-tester'
import { join } from 'node:path'
import { DenyParentIndexFileImportMessageIds, denyParentIndexFileImportRule } from './deny-parent-index-file-import'
const tsRootDirectory = join(__dirname, '../..', 'test')
const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    tsconfigRootDir: tsRootDirectory,
    project: './tsconfig.json',
  },
})

ruleTester.run('deny-parent-index-file-import', denyParentIndexFileImportRule, {
  valid: [
    {
      // language=typescript
      code: `import { foo } from '@angular/core'`,
    },
  ],
  invalid: [
    {
      // language=typescript
      code: `import { foo } from '..'`,
      errors: [{ messageId: DenyParentIndexFileImportMessageIds.DENIED_IMPORT }],
    },
    {
      // language=typescript
      code: `import { foo } from '../..'`,
      errors: [{ messageId: DenyParentIndexFileImportMessageIds.DENIED_IMPORT }],
    },
    {
      // language=typescript
      code: `import { foo } from 'aws-sdk'
      import { MyService } from '../..'`,
      errors: [{ messageId: DenyParentIndexFileImportMessageIds.DENIED_IMPORT, data: { path: '../..' } }],
    },
  ],
})
