import { createRuleTester } from '../utils/rule-tester'
import { DenyParentIndexFileImportMessageIds, denyParentIndexFileImportRule } from './deny-parent-index-file-import'

const ruleTester = createRuleTester()

ruleTester.run('deny-parent-index-file-import', denyParentIndexFileImportRule, {
  valid: [
    {
      code: `import { foo } from '@angular/core'`,
    },
  ],
  invalid: [
    {
      code: `import { foo } from '..'`,
      errors: [{ messageId: DenyParentIndexFileImportMessageIds.DENIED_IMPORT }],
    },
    {
      code: `import { foo } from '../..'`,
      errors: [{ messageId: DenyParentIndexFileImportMessageIds.DENIED_IMPORT }],
    },
    {
      code: `import { foo } from 'aws-sdk'
      import { MyService } from '../..'`,
      errors: [{ messageId: DenyParentIndexFileImportMessageIds.DENIED_IMPORT, data: { path: '../..' } }],
    },
  ],
})
