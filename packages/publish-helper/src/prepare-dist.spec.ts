import {fixPackageJsonPaths} from './helpers.js'

describe('prepare-dist', () => {

    test('path rewrite', async () => {
        const packageJson = {name: 'sample-package', main: './dist/_cjs/index.js', module: './dist/index.js', exports: {'.':'./dist/index.js'}}
        const packageJson2 = {...packageJson, exports: {'.': {types:'./dist/index.d.ts', default: './dist/index.js', require: './dist/_cjs/index.js'}}}
        const fixedPackagesJson = fixPackageJsonPaths(packageJson, 'dist/', () => {})
        expect(fixedPackagesJson).toEqual({...packageJson, main: './_cjs/index.js', module: './index.js', exports: {'.': './index.js'}})

        const fixedPackagesJson2 = fixPackageJsonPaths(packageJson2, 'dist/', () => {})
        expect(fixedPackagesJson2).toEqual({...packageJson2, main: './_cjs/index.js', module: './index.js', exports: {'.': {types: './index.d.ts', default: './index.js', require:'./_cjs/index.js'}}})
    })

    test('unknown value of field exports', () => {
        expect(() => {
            fixPackageJsonPaths({exports: true}, 'dist', () => {})
        }).toThrowError()
    })

})