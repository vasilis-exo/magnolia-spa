module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  plugins: [
    'vue'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off',
    'object-curly-newline': 0,
    'comma-dangle': ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'import/extensions': 0,
    'max-len': ['warn', 160],
    indent: ['error', 2]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{,j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
  // "eslint.workingDirectories": [
  //   {'mode': 'auto'}
  // ],
};
