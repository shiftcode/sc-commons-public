import { denyParentIndexFileImportRule } from './rules/deny-parent-index-file-import'
import { importDenyListRule } from './rules/import-denylist'
import { prefixBuiltinModuleImportRule } from './rules/prefix-builtin-module-import'

module.exports = {
  rules: {
    'deny-parent-index-file-import': denyParentIndexFileImportRule,
    'import-denylist': importDenyListRule,
    'prefix-builtin-module-import': prefixBuiltinModuleImportRule,
  },
}
