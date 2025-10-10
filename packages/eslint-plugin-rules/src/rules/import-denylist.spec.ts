import { join } from 'node:path'
import { RuleTester } from '@typescript-eslint/rule-tester'
import { ImportDenylistMessageIds, importDenyListRule } from './import-denylist'

const tsRootDirectory = join(__dirname, '../..', 'test')
const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    parserOptions: { project: './tsconfig.json', tsconfigRootDir: tsRootDirectory },
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
