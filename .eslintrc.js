module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: 'off',
    semi: 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'object-curly-newline': [
      'off',
      {
        ObjectExpression: 'always',
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 }
      }
    ],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['off'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-continue': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-cycle': ['off', { ignoreExternal: true }],
    'max-len': ['off']
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true
      }
    }
  ]
}
