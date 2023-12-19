import { ESLintUtils, TSESTree } from '@typescript-eslint/utils'
import { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { builtinModules } from 'node:module'
// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

export enum PrefixNodeModuleImportMessageIds {
  USE_NODE_PREFIX_FOR_BUILTIN_MODULE = 'useNotePrefixForBuiltinModule',
}

const createRule = ESLintUtils.RuleCreator(
  () => 'https://github.com/shiftcode/sc-commons-public/blob/master/README.md#sc-commons-public',
)

export const prefixBuiltinModuleImportRule = createRule({
  create(context: Readonly<RuleContext<any, any>>) {
    const testAndReportModulPathOnNode = (node: TSESTree.Node, path: string) => {
      if (builtinModules.includes(path)) {
        context.report({
          node: node,
          messageId: PrefixNodeModuleImportMessageIds.USE_NODE_PREFIX_FOR_BUILTIN_MODULE,
          data: { path },
          fix: (fixer) => fixer.replaceText(node, `'node:${path}'`),
        })
      }
    }

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        testAndReportModulPathOnNode(node.source, node.source.value)
      },
      CallExpression(node: TSESTree.CallExpression) {
        if ((node.callee as any).name !== 'require') {
          return
        }

        const arg0 = (<any>node.arguments[0])?.value
        if (typeof arg0 !== 'string') {
          return
        }

        testAndReportModulPathOnNode(node.arguments[0], arg0)
      },
    }
  },
  name: 'prefix-builtin-module-import',
  meta: {
    docs: {
      description: 'deny non-prefixed imports from builtin node modules',
      // recommended: 'recommended', // if set, one could use it inside "extends: [...]" via "xxx:recommended"
    },
    messages: {
      [PrefixNodeModuleImportMessageIds.USE_NODE_PREFIX_FOR_BUILTIN_MODULE]:
        'import path to builtin module needs to be prefixed with "node:" (module: {{path}})',
    },
    type: 'problem',
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
})
