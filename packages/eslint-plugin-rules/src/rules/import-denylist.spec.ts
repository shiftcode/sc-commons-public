import { createRuleTester } from '../utils/rule-tester'
import { ImportDenylistMessageIds, importDenyListRule } from './import-denylist'

const ruleTester = createRuleTester()

ruleTester.run('import-denylist', importDenyListRule, {
  valid: [
    {
      options: [{ patterns: ['/aws-cdk-lib\\/core/'] }],
      code: `import {foo} from '@angular/core'`,
    },
    {
      options: [],
      code: `import {foo} from '@angular/core'`,
    },
  ],
  invalid: [
    {
      options: [{ patterns: [/aws-cdk-lib\/core/] }],
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
