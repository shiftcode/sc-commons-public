import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

import CONFIG from '../../vitest.config.js'

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
    ...CONFIG.test,
    setupFiles: ['./test/vitest-setup.ts'],
  },
})
