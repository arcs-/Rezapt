const defaultRules = {
  'import/no-unresolved': 'off',
  'import/extensions': 'off',
  'no-unreachable': 'warn',

  'no-alert': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

  'max-len': ['error', { code: 150 }],

  'no-restricted-syntax': 'off',
  'no-unused-vars': 'warn',
  'no-param-reassign': 'off',
  'class-methods-use-this': 'warn',

  'func-names': 'off',
  'no-plusplus': 'off',
  'import/no-named-as-default': 'off',
  'import/no-named-as-default-member': 'off',
};

module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
  },

  extends: ['eslint-config-airbnb-base'],

  rules: defaultRules,

  overrides: [

    // vue
    {
      files: ['**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: {
          ts: '@typescript-eslint/parser',
        },
      },
      extends: ['@vue/airbnb', 'plugin:vue/vue3-recommended'],
      rules: {
        ...defaultRules,

        'vue/max-attributes-per-line': ['error', { singleline: 3 }],
        'vue/multiline-html-element-content-newline': ['error', {
          allowEmptyLines: true,
        }],
        'vuejs-accessibility/label-has-for': 'off',
        'vuejs-accessibility/click-events-have-key-events': 'off',
        'vuejs-accessibility': 'off',
        'vuejs-accessibility/alt-text': 'warn',
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/require-default-prop': 'off',
        'vue/no-unused-components': 'warn',
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      },
    },

    // typescript
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
    },

  ],

};
