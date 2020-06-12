module.exports = {
  "root": true,
  "extends": [
      "gaoding",
      "gaoding-vue"
  ],
  'parserOptions': {
    'ecmaVersion': 9,
    'ecmaFeatures': {
      'jsx': true
    },
    'sourceType': 'module'
  },
  'env': {
    'es6': true,
    'node': true,
    'jest': true
  },
  'rules': {
    'camelcase': 0,
    'comma-dangle': 0,
    'no-control-regex': 0,
    'no-return-assign': 0,
    'no-useless-call': 0,
    'prefer-promise-reject-errors': 0,
    "vue/attribute-hyphenation": 0,
    "vue/require-default-prop": 0,
    "vue/script-indent": 0
  },
  'globals': {
    'window': true,
    'document': true,
    'App': true,
    'Page': true,
    'Component': true,
    'Behavior': true,
    'wx': true,
    'my': true,
    "getApp": true,
    'getCurrentPages': true,
  }
}
