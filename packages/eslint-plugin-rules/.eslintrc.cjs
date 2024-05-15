/* eslint-env node */
module.exports = {
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],

  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.jest.json'],
  },
}
