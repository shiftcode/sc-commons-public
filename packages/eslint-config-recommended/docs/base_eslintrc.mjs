import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPreferArrow from 'eslint-plugin-prefer-arrow';
import eslintPluginJsdoc from 'eslint-plugin-jsdoc';

import {
  TSLINT_ORIGINATED_GENERALLY_APPLICABLE_RULES,
  TSLINT_ORIGINATED_TS_SPECIFIC_RULES,
} from './tslint-to-eslint-mapping.js';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedRequiringTypeChecking,
  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import': eslintPluginImport,
      'prefer-arrow': eslintPluginPreferArrow,
      'jsdoc': eslintPluginJsdoc,
    },
    rules: {
      ...TSLINT_ORIGINATED_GENERALLY_APPLICABLE_RULES,
      'no-empty': 'off',
      'no-fallthrough': 'off',
      'import/no-deprecated': 'warn',
      'jsdoc/no-types': 'error',
    },
  },
  {
    files: ['**/*.{ts,cts,mts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      ...TSLINT_ORIGINATED_TS_SPECIFIC_RULES,
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
    },
  },
];
