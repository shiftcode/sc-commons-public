/*
 * Links to TSLint rule-sets:
 *    - https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
 *    - https://github.com/palantir/tslint/blob/master/src/configs/latest.ts
 */

/*
 * rules from: "tslint:recommended" (applicable both for JS + TS)
 */
export const TSLINT_ORIGINATED_GENERALLY_APPLICABLE_RULES = {
  'guard-for-in': 'error', // TSLint: "forin"
  'no-caller': 'error', // TSLint: "no-arg"
  'no-bitwise': 'error', // TSLint: "no-bitwise"
  'no-console': 'error', // TSLint: "no-console"
  'no-new-wrappers': 'error', // TSLint: "no-construct"
  'no-eval': 'error', // TSLint: "no-eval"
  'no-throw-literal': 'error', // TSLint: "no-string-throw"
  'one-var': ['error', 'never'], // TSLint: "one-variable-per-declaration"
  radix: 'error', // TSLint: "radix"
  eqeqeq: ['error', 'smart'], // TSLint: "triple-equals"
  'id-match': 'error', // TSLint: "variable-name" (partial coverage)
  'id-denylist': [
    // TSLint: "variable-name" (partial coverage)
    'error',
    'any',
    'number',
    'Number',
    'string',
    'String',
    'boolean',
    'Boolean',
    'undefined',
    'Undefined',
  ],

  /*
   * rules that are covered within additional ESLint plugins
   */
  'jsdoc/check-alignment': 'error', // TSLint: "jsdoc-format"
  'jsdoc/check-indentation': 'error', // TSLint: "jsdoc-format"
  'jsdoc/newline-after-description': 'error', // TSLint: "jsdoc-format"
  'jsdoc/multiline-blocks': 'error', // TSLint: "jsdoc-format", ruleArg: "check-multiline-start"
}

/*
 * rules from:
 *   - "tslint:recommended" (specific for TS)
 *   - "tslint:latest" (specific for TS)
 */
export const TSLINT_ORIGINATED_TS_SPECIFIC_RULES = {
  'max-classes-per-file': ['error', 1], // TSLint: "max-classes-per-file": { options: 1 }
  'no-duplicate-imports': 'error', // TSLint: "no-duplicate-imports"
  'no-extra-bind': 'error', // TSLint: "unnecessary-bind"
  'no-new-func': 'error', // TSLint: "function-constructor"
  'no-return-await': 'error', // TSLint: "no-return-await"
  'no-sequences': 'error', // TSLint: "ban-comma-operator"
  'no-template-curly-in-string': 'error', // TSLint: "no-invalid-template-strings"
  'no-undef-init': 'error', // TSLint: "no-unnecessary-initializer"
  'object-shorthand': 'error', // TSLint: "object-literal-shorthand"
  'prefer-object-spread': 'error', // TSLint: "prefer-object-spread"

  '@typescript-eslint/array-type': [
    // TSLint: "array-type": { options: ["array"] }
    'error',
    { default: 'array-simple' },
  ],
  '@typescript-eslint/consistent-type-assertions': 'error', // TSLint: "no-angle-bracket-type-assertion"
  '@typescript-eslint/prefer-for-of': 'error', // TSLint: "prefer-for-of"
  '@typescript-eslint/prefer-function-type': 'error', // TSLint: "callable-types"
  'spaced-comment': [
    // TSLint: "comment-format"
    'error',
    'always',
    { markers: ['/'] },
  ],
  '@typescript-eslint/unified-signatures': 'error', // TSLint: "unified-signatures"
  '@typescript-eslint/naming-convention': [
    // TSLint: "class-name", "interface-name"
    'error',
    {
      // START naming-convention default options
      selector: 'default',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    }, // END naming-convention default options
    {
      // add another option to allow upper-case enum member names
      selector: 'enumMember',
      format: ['PascalCase', 'UPPER_CASE'],
    },
  ],

  /*
   * combinations of disabled ESLint rules in favour to a newer "@typescript-eslint" rule
   */
  '@typescript-eslint/no-unused-expressions': 'error', // TSLint: "no-unused-expression"
  'no-unused-expressions': 'off', // in combination with "@typescript-eslint/no-unused-expressions"

  '@typescript-eslint/dot-notation': 'error', // TSLint: "no-string-literal"
  'dot-notation': 'off', // in combination with '@typescript-eslint/dot-notation'

  '@typescript-eslint/no-shadow': [
    // TSLint: "no-shadowed-variable"
    'error',
    { hoist: 'all' },
  ],
  'no-shadow': 'off', // in combination with '@typescript-eslint/no-shadow'

  /*
   * rules that are covered within additional ESLint plugins
   */
  'prefer-arrow/prefer-arrow-functions': 'error', // TSLint: "only-arrow-functions" (Plugin: "eslint-plugin-prefer-arrow")
  'import/no-internal-modules': 'error', // TSLint: "no-submodule-imports"
  'import/no-extraneous-dependencies': 'error', // TSLint: "no-implicit-dependencies"
}
