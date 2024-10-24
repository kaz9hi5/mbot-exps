module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'indent': [ 'error',2 ],
    'linebreak-style': [ 'error','unix' ],
    'quotes': [ 'error','single' ],
    'semi': [ 'error', 'always' ],
    'vue/multi-word-component-names': 'off',
  }
}
