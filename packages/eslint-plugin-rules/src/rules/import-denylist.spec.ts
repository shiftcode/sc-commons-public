import { join } from 'node:path'
import { RuleTester } from '@typescript-eslint/rule-tester'
import { ImportDenylistMessageIds, importDenyListRule } from './import-denylist'

const tsRootDirectory = join(__dirname, '../..', 'test')
const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    tsconfigRootDir: tsRootDirectory,
    project: './tsconfig.json',
  },
})

ruleTester.run('import-denylist', importDenyListRule, {
  valid: [
    {
      options: [{ patterns: ['/aws-cdk-lib\\/core/'] }],
      // language=typescript
      code: `import {foo} from '@angular/core'`,
    },
    {
      options: [] as any,
      // language=typescript
      code: `import {foo} from '@angular/core'`,
    },
  ],
  invalid: [
    {
      options: [{ patterns: [/aws-cdk-lib\/core/] }],
      // language=typescript
      code: `import {foo} from 'aws-cdk-lib/core'`,
      errors: [
        {
          messageId: ImportDenylistMessageIds.DENIED_PATH,
          data: { path: 'aws-cdk-lib/core', matched: '/aws-cdk-lib\\/core/' },
        },
      ],
    },
  ],
})
