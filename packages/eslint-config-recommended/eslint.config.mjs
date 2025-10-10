import { defineScTsConfig } from '@shiftcode/eslint-config-recommended'

export default defineScTsConfig({
  languageOptions: { parserOptions: { project: ['./tsconfig.json'] } },
})
