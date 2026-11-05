import { defineScTsConfig } from '@shiftcode/eslint-config-recommended'

export default defineScTsConfig(
  {
    languageOptions: { parserOptions: { project: ['./tsconfig.lint.json'] } },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'import/no-internal-modules': ['error', { allow: ['aws-cdk-lib/*'] }],
    },
  },
  {
    files: ['src/scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
)
