import path from 'node:path'

import { defineConfig } from 'vitest/config'

import tsconfig from './tsconfig.spec.json'

const alias = Object.fromEntries(
  Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
    key.replace('/*', ''),
    path.resolve(import.meta.dirname, value.replace('/*', '')),
  ]),
)

export default defineConfig({
  test: { alias },
})
