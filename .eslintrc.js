module.exports = {
  'env': {
    'es2020': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'jsdoc',
  ],
  'rules': {
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'linebreak-style': [ // change this accordingly
      'warn',
      'unix',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'arrow-parens': [
      'error',
      'as-needed',
      {
        'requireForBlockBody': true,
      },
    ],
    'max-len': 'off', // NO
    'require-jsdoc': 'off', // favor eslint-plugin-jsdoc
    'valid-jsdoc': 'off', // favor eslint-plugin-jsdoc
    'new-cap': 'off', // prevent decorator issues
    'no-invalid-this': 'off', // prevent `this` false alarm on arrow functions
    'require-atomic-updates': 'off', // prevent async false alarm
  },
};
