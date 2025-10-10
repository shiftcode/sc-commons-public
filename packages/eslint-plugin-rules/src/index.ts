import { denyParentIndexFileImportRule } from './rules/deny-parent-index-file-import.js'
import { importDenyListRule } from './rules/import-denylist.js'
import { prefixBuiltinModuleImportRule } from './rules/prefix-builtin-module-import.js'
import { ConfigObject, Plugin, RuleDefinition } from '@eslint/core'

const DEFAULT_RULE_NS = `@shiftcode`

export const meta = { name: '@shiftcode/eslint-plugin-rules' } satisfies Plugin['meta']

export const rules: Record<string, RuleDefinition> = {
  'deny-parent-index-file-import': denyParentIndexFileImportRule,
  'prefix-builtin-module-import': prefixBuiltinModuleImportRule,
  'import-denylist': importDenyListRule,
} as Record<string, any>

export const configs = {
  recommended: {
    name: 'recommended',
    plugins: {
      [DEFAULT_RULE_NS]: { meta, rules },
    },
    rules: {
      [`${DEFAULT_RULE_NS}/deny-parent-index-file-import`]: 'error',
      [`${DEFAULT_RULE_NS}/prefix-builtin-module-import`]: 'error',
    },
  },
} satisfies Record<string, ConfigObject>
