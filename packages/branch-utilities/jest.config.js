import {pathsToModuleNameMapper} from 'ts-jest'
import tsConfig from './tsconfig.jest.json' assert {type: 'json'}

export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {tsconfig: 'tsconfig.jest.json', useESM: true}]
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    ...pathsToModuleNameMapper(tsConfig.compilerOptions.paths ?? {})
  }
}
