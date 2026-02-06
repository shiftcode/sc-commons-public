import CONFIG from '../../vitest.config.js'

export default {
  test: {
    ...CONFIG.test,
    globals: true, // necessary for the rule-tester to work
  },
}
