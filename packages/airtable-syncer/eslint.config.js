import { defineScTsConfig } from '@shiftcode/eslint-config-recommended'

export default defineScTsConfig(
  {
    languageOptions: { parserOptions: { project: ['./tsconfig.lint.json'] } },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
)
