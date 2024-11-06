import { denyParentIndexFileImportRule } from './rules/deny-parent-index-file-import.js'
import { importDenyListRule } from './rules/import-denylist.js'
import { prefixBuiltinModuleImportRule } from './rules/prefix-builtin-module-import.js'

export default {
  rules: {
    'deny-parent-index-file-import': denyParentIndexFileImportRule,
    'import-denylist': importDenyListRule,
    'prefix-builtin-module-import': prefixBuiltinModuleImportRule,
  },
}
