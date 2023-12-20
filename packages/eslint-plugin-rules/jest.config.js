/* eslint-env node,es2023 */
// eslint-disable-next-line import/no-extraneous-dependencies
const pathsToModuleNameMapper = require('ts-jest').pathsToModuleNameMapper
const tsConfig = require('./tsconfig.jest.json')

module.exports = {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.jest.json', useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    ...pathsToModuleNameMapper(tsConfig.compilerOptions.paths ?? {}, { prefix: '<rootDir>' }),
  },
}
