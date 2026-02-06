import { defineConfig } from 'vitest/config'

import CONFIG from '../../vitest.config.js'

export default defineConfig({
  test: {
    ...CONFIG.test,
    testTimeout: 10_000,
    teardownTimeout: 10_000,
  },
})
