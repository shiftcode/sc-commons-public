import {
  TSLINT_ORIGINATED_GENERALLY_APPLICABLE_RULES,
  TSLINT_ORIGINATED_TS_SPECIFIC_RULES,
} from './tslint-to-eslint-mapping'

module.exports = {
  /*
   * note: "root" is explicitly not set: this has to be defined by the consuming eslintrc declaration
   */
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import',
    'eslint-plugin-prefer-arrow',
    'jsdoc',
  ],
  overrides: [
    /*
     * Generally applicable JS + TS rules (based on former TSLint config)
     */
    {
      files: ['*.js', '*.cjs', '*.mjs', '*.jsx', '*.ts', '*.cts', '*.mts', '*.tsx'],
      extends: [
        'eslint:recommended', // catching common JS problems
      ],
      rules: {
        ...TSLINT_ORIGINATED_GENERALLY_APPLICABLE_RULES,

        /*
         * Rule overrides (or additional rules)
         */
        'no-empty': 'off', // TSLint: "no-empty" (override "eslint/recommended")
        'no-fallthrough': 'off', // override "eslint:recommended" rule

        /*
         * rules that are covered by ESLint plugins
         */
        'import/no-deprecated': 'warn', // TSLint: "deprecation"
        'import/no-internal-modules': [ // TSLint: "no-submodule-imports"
          'error',
          {
            allow: [
              '@angular/*',
              '@apollo/*',
              '@shiftcode/iac-helper/*',
              'app/',
              'aws-sdk/*',
              'aws-cdk-lib/*',
              'aws-serverless-express/middleware/*',
              'core-js/*',
              'date-fns/esm/locale/*',
              'fs/*',
              'zone.js/*',
            ],
          },
        ],
        'jsdoc/no-types': 'error', // TSLint: "no-redundant-jsdoc"
      },
    },

    /*
     * TS-specific rules
     */
    {
      files: ['*.ts', '*.cts', '*.mts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking', // includes "eslint-recommended" ruleset
      ],
      rules: {
        ...TSLINT_ORIGINATED_TS_SPECIFIC_RULES,

        '@typescript-eslint/array-type': 'off', // TSLint: "array-type"
        '@typescript-eslint/consistent-type-assertions': 'off', // TSLint: "no-angle-bracket-type-assertion", "no-object-literal-type-assertion"
        '@typescript-eslint/dot-notation': 'off', // TSLint: "no-string-literal"
        '@typescript-eslint/explicit-member-accessibility': [ // TSLint: "member-access"
          'error',
          { accessibility: 'no-public' },
        ],

        // fixme: order is slightly different to our configured order
        '@typescript-eslint/member-ordering': 'error', // TSLint: "member-ordering"

        '@typescript-eslint/no-inferrable-types': [ // override "@typescript-eslint/recommended"
          'error',
          { ignoreParameters: true },
        ],
        '@typescript-eslint/no-non-null-assertion': 'error', // override "recommended" with severity "error"
        '@typescript-eslint/no-unused-vars': [ // override "recommended" with severity "error"
          'error',
          { varsIgnorePattern: '^_' },
        ],
      },
    },
  ],

  /*
   * NOTE: parserOptions always have to be set by specific consuming config.
   * (defining a project like ["./tsconfig.json"] would look up the file inside this sc-commons/eslint-config package)
   */
}
