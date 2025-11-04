/* eslint-env node,es2023 */
import { pathsToModuleNameMapper } from 'ts-jest'
import tsConfig from './tsconfig.jest.json' with { type: 'json' }

export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.jest.json', useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    ...pathsToModuleNameMapper(tsConfig.compilerOptions.paths ?? {}),
  },
}
