import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import swc from 'unplugin-swc'

export default function createTypeScriptDecoratorsPlugin(tsconfigUrl) {
  const tsconfigPath = fileURLToPath(tsconfigUrl)
  const config = ts.getParsedCommandLineOfConfigFile(
    tsconfigPath,
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic(diagnostic) {
        throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
      },
    },
  )
  if (config.errors.length) {
    throw new Error(
      config.errors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')).join('\n'),
    )
  }
  if (config.options.target === undefined) {
    throw new Error(`Missing compilerOptions.target in ${tsconfigPath}`)
  }

  return swc.vite({
    jsc: {
      parser: {
        syntax: 'typescript',
        decorators: config.options.experimentalDecorators,
      },
      transform: {
        legacyDecorator: config.options.experimentalDecorators,
        decoratorMetadata: config.options.emitDecoratorMetadata,
      },
      target: ts.ScriptTarget[config.options.target].toLowerCase(),
    },
  })
}
