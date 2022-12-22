module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  // plugins: ['@typescript-eslint/eslint-plugin'],
  plugins: [ 'prettier' ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true
  },
  ignorePatterns: [ '..eslintrc.js' ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': [ 'off' ],
    '@typescript-eslint/no-unused-vars': [ 'off' ],
    '@typescript-eslint/array-bracket-newline': [ 'off' ],
    '@typescript-eslint/no-var-requires': [ 'off' ],

    'no-unused-vars': [ 'off' ],
    'max-len': [ 4, { code: 140 } ],
    'prettier/prettier': 'warn',
    'sort-imports': [ 'error', {
      'ignoreCase': false,
      'ignoreDeclarationSort': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': [ 'none', 'all', 'multiple', 'single' ],
      'allowSeparatedGroups': false
    } ]
  }
};
