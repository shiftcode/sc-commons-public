import { ESLintUtils } from '@typescript-eslint/utils'

export const createScRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/shiftcode/sc-commons-public/blob/main/packages/eslint-plugin-rules/README.md#${name}`,
)
