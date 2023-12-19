module.exports = {
  /*
   * note: "root" is explicitly not set: this has to be defined by the consuming eslintrc declaration
   */

  /*
   * If we move those generally applicable rules directly to the "modules.export" object, it will generate errors
   * for .html files in the consuming project because "eslint:recommended" is not applicable to them.
   *
   * Besides that, concerning to angular-eslint documentation, it is strongly recommended to configure all rules
   * within appropriate file-types-filtered overrides blocks and not directly inside the module.
   */
  overrides: [
    {
      files: ['*.ts', '*.cts', '*.mts', '*.tsx', '*.js', '*.cjs', '*.mjs', '*.jsx'],
      plugins: ['eslint-plugin-import'],
      extends: [
        'eslint:recommended', // catching common JS problems
        'prettier' // disable rules that will be auto fixed by prettier
      ],
      rules: {
        'no-console': 'error', // TSLint: "no-console"
        'max-classes-per-file': 'error', // TSLint: "max-classes-per-file"
        'import/no-deprecated': 'error', // TSLint: "deprecation"
        'import/no-extraneous-dependencies': 'error', // TSLint: "no-implicit-dependencies"
        'import/no-internal-modules': 'error', // TSLint: "no-submodule-imports"
        'curly': 'error', // TSLint: "curly"
        'eqeqeq': 'error', // TSLint: "triple-equals"
      },
    },
    {
      files: ['*.ts', '*.cts', '*.mts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@shiftcode/eslint-rules', '@typescript-eslint', 'unused-imports'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking', // includes "eslint-recommended" ruleset
      ],
      rules: {
        /*
         * additional rules that are not contained within the both extensions configured above
         */
        '@shiftcode/deny-parent-index-file-import': 'error',
        '@shiftcode/prefix-builtin-module-import': 'error',
        
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/explicit-member-accessibility': [
          // TSLint: "member-access"
          'error',
          { accessibility: 'no-public' }, // override default accessibility configuration ('explicit')
        ],
        '@typescript-eslint/member-ordering': [
          // TSLint: "member-ordering"
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
          // TSLint: "class-name", "interface-name"
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

        // no-unused-vars does not support a fixer for "unused imports" which is highly shitty.
        // therefore we use another plugin which can splits up the unused-vars rule into two rules with a fixer for unused imports
        '@typescript-eslint/no-unused-vars': 'off',
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "error",
          { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
        ],
        
        /*
         * disabling rules from extensions
         */
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison':'off',
        
        'no-case-declarations': 'off', // TS marks as error anyway ("TS2454: Variable is used before being assigned.")
        
        
      },
    },
    /*
     * allow some commonly used patterns for testing to pass eslint
     */
    {
      files: ['**/test/**/*.ts','*.spec.ts', '*.test.ts'],
      rules: {
        'no-console': 'off',
        'max-classes-per-file': 'off', // TSLint: "max-classes-per-file"
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        // it's ok to define dependencies also in the root package.json (eg. @jest/globals, ...)
        "import/no-extraneous-dependencies": ["error", {"packageDir": ['.', '../..']}] 
      }
    },
  ],
}
