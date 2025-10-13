import eslint from '@eslint/js'
import eslintScPlugin from '@shiftcode/eslint-plugin-rules'
import { defineConfig } from 'eslint/config'
import eslintPrettier from 'eslint-config-prettier'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import eslintTs from 'typescript-eslint'

/**
 * define the shiftcode eslint config for typescript.
 * the function wraps given configs with some common settings and adds prettier rules at the end.
 * all that's left for you is to define the `languageOptions` and potential rules you want to override/add.

 * @example ```ts
 * import { defineScTsConfig } from '@shiftcode/eslint-config-recommended'
 * export default defineScTsConfig(
 *   {
 *     languageOptions: {
 *       parserOptions: {
 *         project: ['./tsconfig.json', './tsconfig.spec.json'],
 *       },
 *     }
 *   },
 *   {
 *     files: ['**\/*.ts'],
 *     rules: {
 *       '@typescript-eslint/explicit-function-return-type': 'error',
 *     }
 *   }
 * )
 * ```
 */
export function defineScTsConfig(...configs: Parameters<typeof defineConfig>): ReturnType<typeof defineConfig> {
  return defineConfig(
    {
      files: ['**/*.{ts,mts,cts,js,mjs,cjs}'],
      extends: [eslint.configs.recommended],
      plugins: {
        'simple-import-sort': eslintPluginSimpleImportSort,
      },
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'no-console': 'error',
        'max-classes-per-file': 'error',
        curly: 'error',
        eqeqeq: 'error',
      },
    },

    {
      files: ['**/*.{ts,mts,cts}'],
      extends: [eslintTs.configs.recommendedTypeChecked, eslintScPlugin.configs.recommended],
      rules: {
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { accessibility: 'no-public' }, // override default accessibility configuration ('explicit')
        ],
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              'public-static-field',
              'protected-static-field',
              'private-static-field',

              'public-instance-field',
              'protected-instance-field',
              'private-instance-field',

              'public-static-method',
              'protected-static-method',
              'private-static-method',

              'public-constructor',
              'protected-constructor',
              'private-constructor',

              'public-instance-method',
              'protected-instance-method',
              'private-instance-method',
            ],
          },
        ],

        /*
         * the rule sorts selectors in the following priority:
         *    1) individual selectors
         *    2) group selectors
         *    3) default selector
         *
         * within each of these categories, further sorting is based on supplied options:
         *    1) filter
         *    2) types
         *    3) modifiers
         *    4) everything else
         *
         * Link: https://typescript-eslint.io/rules/naming-convention/#how-does-the-rule-automatically-order-selectors
         */
        '@typescript-eslint/naming-convention': [
          'error',
          /*
           * NO NOT USE GROUP SELECTORS AS THEY MAKE IT FAR MORE COMPLICATED TO READ/UNDERSTAND.
           *
           * Instead, add specific individual selectors (or selector arrays) as shown below.
           */
          {
            // examples: const ONLY_NUMBERS_REGEX = ...  //  export const environment = ...
            selector: 'variable',
            modifiers: ['const'],
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allowSingleOrDouble', // <-- use case:  const __ = customStatics
          },
          {
            selector: ['class', 'interface', 'typeAlias', 'enum', 'typeParameter'],
            format: ['PascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
          },
          {
            /*
             * allow (angular host) properties or other literal properties, i.e.:
             *    this.gridColDef = { '<384': 2 }
             *    '[class.mat-elevation-z1]': true
             *    '+': (a: number, b: number) => a + b,
             */
            selector: ['objectLiteralProperty', 'objectLiteralMethod'],
            format: null,
          },

          /*
           * group selector would be: "property"
           *
           * Yeah it's pretty nasty that we have to write some selectors several times for different modifiers.
           * But that's how modifiers work: they ALL have to match exactly for a selector to get applied.
           */
          {
            // example: readonly LengthUnit = LengthUnit    <-- this use case is why we allow PascalCase
            selector: ['classProperty', 'objectLiteralProperty', 'typeProperty'],
            modifiers: ['readonly'],
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
          {
            // example: static readonly ERROR_KEY = ...
            selector: ['classProperty', 'objectLiteralProperty', 'typeProperty'],
            modifiers: ['static', 'readonly'],
            format: ['UPPER_CASE'],
          },
          {
            // example: private static ctrlConfig = ...
            selector: ['classProperty', 'objectLiteralProperty', 'typeProperty'],
            modifiers: ['private', 'static'],
            format: ['camelCase'],
          },
          {
            // example: private static readonly VALUE_SEPARATOR = ...
            selector: ['classProperty', 'objectLiteralProperty', 'typeProperty'],
            modifiers: ['private', 'static', 'readonly'],
            format: ['UPPER_CASE'],
          },
          {
            // allow flattened type properties on a type-def (i.e. 'outerDimension.height': number)
            selector: ['typeProperty', 'classProperty'],
            modifiers: ['requiresQuotes'],
            format: null,
            custom: {
              // any name like
              regex: '^[a-zA-Z]+(\\.[a-zA-Z]+)+$',
              match: true,
            },
          },

          /*
           * defaulting for all the rest which might not got covered by configs above.
           */
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
        ],

        /*
         * overriding severities or configurations of existing rules (contained within given extensions)
         */
        '@typescript-eslint/no-non-null-assertion': 'error', // override "recommended" (severity: "warn")

        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],

        /*
         * disabling rules from extensions
         */
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',

        // not a ts rule but useless for ts files: TS marks as error "TS2454: Variable is used before being assigned."
        'no-case-declarations': 'off',
      },
    },

    // this config is for js and ts but needs to override the upper ones
    {
      files: ['**/*.{ts,mts,cts,js,mjs,cjs}'],
      extends: [],
      plugins: {
        import: eslintPluginImport,
        'unused-imports': eslintPluginUnusedImports,
      },
      rules: {
        'import/no-deprecated': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/no-internal-modules': ['error', { allow: ['aws-cdk-lib/*', '@aws-cdk/*'] }],

        // no-unused-vars does not support a fixer for "unused imports" which is highly shitty.
        // therefore we use another plugin "unused-imports" which can splits up the unused-vars rule into two rules
        // with a fixer for unused imports.
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
      },
    },

    /*
     * allow some commonly used patterns for testing to pass eslint
     */
    {
      files: ['**/test/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
      rules: {
        'no-console': 'off',
        'max-classes-per-file': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },

    // for files which are not part of the src/ folder and for test files
    // it is ok to use dependencies that are listed inside the root package.json (e.g. @shiftcode/eslint-config-recommended)
    {
      files: ['!**/src/**', '**/*.spec.ts', '**/*.test.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { packageDir: ['.', '../..'] }],
      },
    },

    ...configs,

    eslintPrettier,
  )
}
