// const testingOverride = {
//   env: {
//     "jest/globals": true,
//   },
//   extends: ["plugin:jest/recommended", "plugin:jest/style"],
//   files: ["**/*.spec.ts", "**/*.test.ts"],
//   plugins: ["jest"],
//   rules: {
//     'jest/expect-expect': 'off',
//     'sonarjs/no-duplicate-string': 'off',
//     'unicorn/consistent-function-scoping': 'off',
//     'unicorn/no-array-for-each': 'off',
//     'unicorn/no-null': 'off',
//     'unicorn/no-useless-undefined': 'off',
//     'unicorn/prefer-number-properties': 'off'
//   }
// };

module.exports = {
  env: {
    browser: false,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/consistent-type-imports": "error"
  },
};
