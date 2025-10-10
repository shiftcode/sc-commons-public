import { createRuleTester } from '../utils/rule-tester'
import { prefixBuiltinModuleImportRule, PrefixNodeModuleImportMessageIds } from './prefix-builtin-module-import'

const ruleTester = createRuleTester()

ruleTester.run('prefix-builtin-module-import', prefixBuiltinModuleImportRule, {
  valid: [
    {
      code: `
        import { writeFile } from 'node:fs/promises'
        import crypto from 'node:crypto'
      `,
    },
    {
      code: `
        import { join } from 'node:path'
      `,
    },
  ],
  invalid: [
    {
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
