// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  extends: ['@shiftcode/recommended'],

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2023,
    project: [
      './tsconfig.json',
      './tsconfig.jest.json',
    ],
  },
}