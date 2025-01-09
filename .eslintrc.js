// .eslintrc.js
require('@rushstack/eslint-patch/modern-module-resolution');
const { defineConfig } = require('eslint-define-config');
const path = require('path');

module.exports = defineConfig({
  root: true,
  // 将浏览器 API、ES API 和 Node API 看做全局变量，不会被特定的规则(如 no-undef)限制。
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  // 设置自定义全局变量，不会被特定的规则(如 no-undef)限制。
  globals: {
    // 假如我们希望 jquery 的全局变量不被限制，就按照如下方式声明。
    // $: 'readonly',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  // 指定 vue 解析器
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 配置 TypeScript 解析器
    parser: '@typescript-eslint/parser',

    // 通过 tsconfig 文件确定解析范围，这里需要绝对路径，否则子模块中 eslint 会出现异常
    project: path.resolve(__dirname, 'tsconfig.eslint.json'),

    // 支持的 ecmaVersion 版本
    ecmaVersion: 'latest',

    // 我们主要使用 esm，设置为 module
    sourceType: 'module',

    // TypeScript 解析器也要负责 vue 文件的 <script>
    extraFileExtensions: ['.vue']
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  },
  // 文件级别的重写
  overrides: [
    // 对于 vite 和 vitest 的配置文件，不对 console.log 进行错误提示
    {
      files: ['**/vite.config.*', '**/vitest.config.*'],
      rules: {
        'import/no-relative-packages': 'off'
      }
    }
  ]
});
