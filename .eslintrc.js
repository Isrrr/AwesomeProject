module.exports = {
  extends: [
    '@react-native',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  root: true,
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-named-as-default-member': 'off',
    'react/prop-types': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block',
          'block-like',
          'return',
          'multiline-const',
          'multiline-expression',
          'multiline-block-like',
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {vars: 'all', args: 'after-used', varsIgnorePattern: '^_'},
    ],
  },
  settings: {
    'import/resolver': {typescript: true, node: true},
  },
  overrides: [
    {
      files: ['.ts', '.tsx'],
      extends: ['plugin:import/typescript', 'standard-with-typescript'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowTypedFunctionExpressions: true,
          },
        ],
      },
    },
  ],
};
