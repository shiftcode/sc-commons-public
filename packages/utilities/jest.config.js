/* eslint-env node,es2023 */
/* eslint-disable import/no-extraneous-dependencies */
import { pathsToModuleNameMapper } from 'ts-jest'
import { readFileSync } from 'node:fs'

const tsConfig = JSON.parse(readFileSync('./tsconfig.jest.json', 'utf-8'))

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
