import { URL } from 'node:url'

import { mergeConfig } from 'vitest/config'

import CONFIG from '../../vitest.config.js'
import createTypeScriptDecoratorsPlugin from '../../vitest.decorators.js'

export default mergeConfig(CONFIG, {
  plugins: [createTypeScriptDecoratorsPlugin(new URL('./tsconfig.spec.json', import.meta.url))],
})
