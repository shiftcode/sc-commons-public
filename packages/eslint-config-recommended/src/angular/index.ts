import eslintAngular from 'angular-eslint'
import { defineConfig } from 'eslint/config'

import { defineScTsConfig } from '../index.js'

/**
 * define the shiftcode eslint config for angular.
 * the function wraps given configs with some common settings and rules and adds prettier rules at the end.
 * all that's left for you is to define the `languageOptions` and rules you want to override/add
 * like e.g. Component and Directive Selectors.
 *
 * @example ```ts
 * import { defineScAngularConfig } from '@shiftcode/eslint-config-recommended/angular'
 *
 * export default defineScAngularConfig(
 *   {
 *     languageOptions: {
 *       parserOptions: {
 *         project: ['./tsconfig.app.json', './tsconfig.spec.json'],
 *       },
 *     },
 *   },
 *   {
 *     files: ['**\/*.ts'],
 *     rules: {
 *       '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'gf', style: 'kebab-case' }],
 *       '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'gf', style: 'camelCase' }],
 *       '@angular-eslint/prefer-inject': 'error',
 *       '@angular-eslint/prefer-signals': 'error',
 *     }
 *   }
 * )
 * ```
 */
export function defineScAngularConfig(...configs: Parameters<typeof defineConfig>): ReturnType<typeof defineConfig> {
  return defineScTsConfig(
    {
      files: ['**/*.ts'],
      // @ts-expect-error angular fck it up
      extends: [eslintAngular.configs.tsRecommended],
      processor: eslintAngular.processInlineTemplates,
      rules: {
        '@angular-eslint/no-async-lifecycle-method': 'error',
        '@angular-eslint/prefer-standalone': 'error',
        '@angular-eslint/sort-lifecycle-methods': 'error',
        '@angular-eslint/no-lifecycle-call': 'error',
        '@angular-eslint/prefer-output-readonly': 'warn',
        '@angular-eslint/no-host-metadata-property': 'off',
        '@angular-eslint/no-queries-metadata-property': 'error',

        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error',

        // default grouping extended with our internal app/... (tsconfig.path) imports as a seperate group
        // default group definition copied from: https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/src/imports.js#L5
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Side effect imports.
              ['^\\u0000'],
              // Node.js builtins prefixed with `node:`.
              ['^node:'],
              // Packages.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              ['^@?\\w'],
              // Internal packages exposed trough tsconfig.path tha use app/ or @/ as shortcut. (like app/shared, or @/shared)
              ['^(@|app)(/.*|$)'],
              // Absolute imports and other imports such as Vue-style `@/foo`.
              // Anything not matched in another group.
              ['^'],
              // Relative imports.
              // Anything that starts with a dot.
              ['^\\.'],
            ],
          },
        ],
      },
    },

    {
      files: ['**/*.html'],
      extends: [...eslintAngular.configs.templateRecommended],
      rules: {
        '@angular-eslint/template/no-inline-styles': 'off', // also disallows custom properties like style="--my-prop: value".

        '@angular-eslint/template/no-duplicate-attributes': 'error',
        '@angular-eslint/template/button-has-type': 'error',
        '@angular-eslint/template/prefer-control-flow': 'error',
        '@angular-eslint/template/prefer-self-closing-tags': 'error',
        '@angular-eslint/template/prefer-static-string-properties': 'error',
        '@angular-eslint/template/no-negated-async': 'error',
        '@angular-eslint/template/no-empty-control-flow': 'error',
        '@angular-eslint/template/prefer-at-empty': 'error',

        // some very basic a11y rules
        '@angular-eslint/template/elements-content': 'error',
        '@angular-eslint/template/interactive-supports-focus': 'error',
        '@angular-eslint/template/label-has-associated-control': 'error',
        '@angular-eslint/template/no-positive-tabindex': 'error',
        '@angular-eslint/template/role-has-required-aria': 'error',
        '@angular-eslint/template/table-scope': 'error',
      },
    },
    ...configs,
  )
}
