module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'typescript',
  ],
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'CallExpression[callee.object.name="console"][callee.property.name!=/^(warn|error|info|trace)$/]',
        message: 'Unexpected property on console object was called'
      }
    ],
    'comma-dangle': ['error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never'
      }
    ],
    indent: [
      'error',
      2,
      { "SwitchCase": 1 }
    ],
    'import/named': 'off',
    'import/no-unresolved': [
      2,
      {
        ignore: [
          'config',
          'controllers',
          'gql',
          'integrations',
          'models',
          'temp',
          'types',
          'utils',
        ]
      }
    ],
    'sort-imports': 'off',
    'import/order': 'error',
    'no-multiple-empty-lines': ['error',
      {
        'max': 1, 'maxEOF': 1
      }
    ],
    'eol-last': ['error', 'always'
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    '@typescript-eslint/no-unused-vars': ['error',
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": false
      }
    ]
  },
};
