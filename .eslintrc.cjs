module.exports = {
  extends: ['standard-with-typescript', 'plugin:import/recommended', 'plugin:import/typescript'],
  plugins: ['import', 'promise', 'standard', '@typescript-eslint', 'jest'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.test.ts', '*.test.js'],
      env: {
        'jest/globals': true,
      },
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 6,
  },
  rules: {
    'comma-dangle': 0,
    'import/no-unused-modules': [
      1,
      {
        unusedExports: true,
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', ['index', 'sibling', 'parent'], 'internal', 'object'],
      },
    ],
  },
};
