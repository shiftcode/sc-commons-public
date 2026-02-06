import { defineConfig } from 'vitest/config'
import path from 'node:path'
import tsconfig from './tsconfig.spec.json'

// hacky but works.. --> the `${configDir}` variable is a TypeScript-config feature.
// but i didnt find a way to get the tsconfig parsed with the variable resolved...

const alias = Object.fromEntries(
  Object.entries(tsconfig.compilerOptions.paths ?? {})
    // order matters. we need the more specific (=the longer) entries first (deep import)
    //  as it will be used with `startsWith` from vitest.
    .sort((a, b) => b[0].length - a[0].length)
    .map(([key, [value]]) => [
      key,
      path.resolve(import.meta.dirname, value.replace('${configDir}/../', './packages/')),
    ]),
)

export default defineConfig({
  test: {
    globals: false,
    alias,
  },
})
