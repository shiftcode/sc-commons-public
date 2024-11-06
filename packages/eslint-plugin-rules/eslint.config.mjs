import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.jest.json"],
      },
    },
    rules: {
        "import/no-extraneous-dependencies": ["error", {
            devDependencies: true,
        }],
    },
  }
];

// export default [{
//     languageOptions: {
//         ecmaVersion: 5,
//         sourceType: "script",

//         parserOptions: {
//             project: ["./tsconfig.json", "./tsconfig.jest.json"],
//         },
//     },
// }, {
//     files: ["**/*.ts"],
//     plugins: {
//         import: importPlugin,
//     },
//         rules: {
//         "import/no-extraneous-dependencies": ["error", {
//             devDependencies: true,
//         }],
//     },
// }];