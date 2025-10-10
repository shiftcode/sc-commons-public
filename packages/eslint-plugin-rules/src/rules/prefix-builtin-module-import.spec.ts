import { RuleTester } from '@typescript-eslint/rule-tester'
import { join } from 'node:path'
import { prefixBuiltinModuleImportRule, PrefixNodeModuleImportMessageIds } from './prefix-builtin-module-import'

const tsRootDirectory = join(__dirname, '../..', 'test')
const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    parserOptions: { project: './tsconfig.json', tsconfigRootDir: tsRootDirectory },
  },
})

ruleTester.run('prefix-builtin-module-import', prefixBuiltinModuleImportRule, {
  valid: [
    {
      // language=typescript
      code: `
        import { writeFile } from 'node:fs/promises'
        import crypto from 'node:crypto'
      `,
    },
    {
      // language=typescript
      code: `
        import { join } from 'node:path'
      `,
    },
  ],
  invalid: [
    {
      // language=typescript
      code: `import { writeFile } from 'fs'`,
      errors: [
        {
          messageId: PrefixNodeModuleImportMessageIds.USE_NODE_PREFIX_FOR_BUILTIN_MODULE,
          data: { path: 'fs' },
        },
      ],
      output: `import { writeFile } from 'node:fs'`,
    },
    {
      // language=typescript
      code: `
        import { writeFileSync } from 'node:fs'
        import { writeFile } from 'fs/promises'
        import crypto from 'crypto'
      `,
      errors: [
        {
          messageId: PrefixNodeModuleImportMessageIds.USE_NODE_PREFIX_FOR_BUILTIN_MODULE,
          data: { path: 'fs/promises' },
        },
        {
          messageId: PrefixNodeModuleImportMessageIds.USE_NODE_PREFIX_FOR_BUILTIN_MODULE,
          data: { path: 'crypto' },
        },
      ],
      output: `
        import { writeFileSync } from 'node:fs'
        import { writeFile } from 'node:fs/promises'
        import crypto from 'node:crypto'
      `,
    },
    {
      // language=typescript
      code: `const fs = require('fs')`,
      errors: [
        {
          messageId: PrefixNodeModuleImportMessageIds.USE_NODE_PREFIX_FOR_BUILTIN_MODULE,
          data: { path: 'fs' },
        },
      ],
      output: `const fs = require('node:fs')`,
    },
  ],
})
