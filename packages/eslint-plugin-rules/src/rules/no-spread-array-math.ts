import { TSESTree } from '@typescript-eslint/utils'
import { RuleContext } from '@typescript-eslint/utils/ts-eslint'

import { createScRule } from './create-rule.function.js'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

export enum NoSpreadArrayMathMessageIds {
  NO_SPREAD_ARRAY = 'noSpreadArray',
}

const MATH_METHODS = ['min', 'max'] as const

export const noSpreadArrayMathRule = createScRule({
  create(context: Readonly<RuleContext<any, any>>) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        // check for Math.min or Math.max
        if (
          node.callee.type !== TSESTree.AST_NODE_TYPES.MemberExpression ||
          node.callee.object.type !== TSESTree.AST_NODE_TYPES.Identifier ||
          node.callee.object.name !== 'Math' ||
          node.callee.property.type !== TSESTree.AST_NODE_TYPES.Identifier ||
          !MATH_METHODS.includes(node.callee.property.name as any)
        ) {
          return
        }

        const method = node.callee.property.name

        for (const arg of node.arguments) {
          if (arg.type !== TSESTree.AST_NODE_TYPES.SpreadElement) {
            continue
          }
          // allow spreading array literals: Math.min(...[1, 2, 3])
          if (arg.argument.type === TSESTree.AST_NODE_TYPES.ArrayExpression) {
            continue
          }
          context.report({
            node: arg,
            messageId: NoSpreadArrayMathMessageIds.NO_SPREAD_ARRAY,
            data: { method },
          })
        }
      },
    }
  },
  name: 'no-spread-array-math',
  meta: {
    docs: {
      description: 'disallow spreading arrays of unknown length into Math.min or Math.max to prevent RangeError',
    },
    messages: {
      [NoSpreadArrayMathMessageIds.NO_SPREAD_ARRAY]:
        'Do not spread an array of unknown length into Math.{{method}}(). This can cause a RangeError when the array is too large. Use a manual loop instead.',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
})
