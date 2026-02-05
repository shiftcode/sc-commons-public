import path from 'node:path'

import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

import tsconfig from './tsconfig.spec.json'

const alias = Object.fromEntries(
  Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
    key.replace('/*', ''),
    path.resolve(import.meta.dirname, value.replace('/*', '')),
  ]),
)

export default defineConfig({
  plugins: [
    swc.vite({
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
        },
        transform: {
          decoratorMetadata: true,
        },
        target: 'es2022',
      },
    }),
  ],
  test: {
    alias,
    setupFiles: ['./test/vitest-setup.ts'],
  },
})
