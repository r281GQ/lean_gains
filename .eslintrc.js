module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'import'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  extends: ['airbnb-base', 'plugin:react/recommended', 'eslint:recommended'],
  rules: {
    'import/extensions': 'off',
    'no-unused-vars': ['warn'],
    'import/no-unresolved': ['error'],
    'import/no-extraneous-dependencies': 'off',
    'react/prop-types': [
      'error',
      {
        ignore: [
          'input',
          'location',
          'match',
          'invalid',
          'submitting',
          'handleSubmit',
          'initialize',
          'reset',
          'fields',
          'goBack',
          'goForward',
        ],
      },
    ],
    'no-console': ['warn'],
    'import/first': ['off'],
  },
  settings: {
    'import/resolver': 'webpack',
  },
};
