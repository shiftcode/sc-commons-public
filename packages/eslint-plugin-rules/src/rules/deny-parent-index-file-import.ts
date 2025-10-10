// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
import { TSESTree } from '@typescript-eslint/utils'
import { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { createScRule } from './create-rule.function.js'

export enum DenyParentIndexFileImportMessageIds {
  DENIED_IMPORT = 'deniedImport',
}

export const denyParentIndexFileImportRule = createScRule({
  create(context: Readonly<RuleContext<any, any>>) {
    const indexFileRegExp = new RegExp(/^\.[\.\/\.]*\.$/) // eslint-disable-line no-useless-escape

    const reportOnNode = (node: any, type: string, path: string) => {
      if (indexFileRegExp.test(path)) {
        context.report({
          node,
          messageId: DenyParentIndexFileImportMessageIds.DENIED_IMPORT,
          data: { path },
        })
      }
    }

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const path = node.source.value
        reportOnNode(node, 'import', path)
      },
      CallExpression(node: TSESTree.CallExpression) {
        if ((node.callee as any).name !== 'require') {
          return
        }
        const path = (node.arguments[0] as any).value
        reportOnNode(node, 'require', path)
      },
    }
  },
  name: 'deny-parent-index-file-import',
  meta: {
    docs: {
      description: 'deny imports from any parent index file',
      // recommended: 'recommended', // if set, one could use it inside "extends: [...]" via "xxx:recommended"
    },
    messages: {
      [DenyParentIndexFileImportMessageIds.DENIED_IMPORT]:
        'importing from parent index file not allowed (path: {{path}})',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
})
