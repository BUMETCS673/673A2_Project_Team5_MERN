module.exports = {
  extends: ['airbnb'],
  ignorePatterns: ['node_modules/', 'dist/'],

  rules: {
    semi: 'off',
    'max-len': [
      'error',
      100,
      {
        ignoreTrailingComments: true,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],

    'no-nested-ternary': 'off',
    'default-case': 'off',
    'arrow-parens': 'off',
    'function-paren-newline': 'off',
    'react/jsx-curly-newline': 'off',
    'no-unused-expressions': 'off',
    camelcase: 'off',
    'no-confusing-arrow': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'spaced-comment': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],

    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
}
