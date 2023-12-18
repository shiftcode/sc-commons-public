// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
import { ESLintUtils } from '@typescript-eslint/utils'
import { RuleContext } from '@typescript-eslint/utils/ts-eslint'

const createRule = ESLintUtils.RuleCreator(
  () => 'https://github.com/shiftcode/sc-commons/blob/master/README.md#sc-commons',
)

export enum ImportDenylistMessageIds {
  DENIED_PATH = 'deniedPath',
}
export const importDenyListRule = createRule({
  create(context: Readonly<RuleContext<any, Array<{ patterns: Array<string | RegExp> }>>>) {
    const patterns: Array<string | RegExp> = context.options?.[0]?.patterns ?? []

    const reportOnNode = (node: any, type: string, path: string) => {
      const invalid = patterns.filter((p) => new RegExp(p).test(path))

      if (invalid.length > 0) {
        const matched = invalid.map((i: string | RegExp) => i.toString()).join(', ')
        context.report({
          node,
          messageId: ImportDenylistMessageIds.DENIED_PATH,
          data: { path, matched },
        })
      }
    }

    return {
      ImportDeclaration(node: any) {
        const path = node.source.value
        reportOnNode(node, 'import', path)
      },
      CallExpression(node: any) {
        if (node.callee.name !== 'require') {
          return
        }
        const path = node.arguments[0].value
        reportOnNode(node, 'require', path)
      },
    }
  },
  name: 'import-denylist',
  meta: {
    docs: {
      description: 'deny imports from listed files',
      // recommended: 'recommended', // if set, one could use it inside "extends: [...]" via "xxx:recommended"
    },
    messages: {
      [ImportDenylistMessageIds.DENIED_PATH]: 'denied path: {{path}} (pattern: {{matched}})',
    },
    type: 'problem',
    schema: [
      {
        type: 'object',
        properties: {
          patterns: { type: 'array' },
        },
        additionalProperties: false, // only allow defined properties within the schema object definition
      },
    ],
  },
  defaultOptions: [],
})
