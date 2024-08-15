import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      project: './tsconfig.app.json',
      tsconfigRootDir: './', // Ajuste o caminho conforme necessário
    },
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prefer-const': 'warn', 
    'no-var': 'error',
    'semi': ['error'],
    'indent': ['error', 2],
    'quotes': ['error'], 
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": "error",
    "space-before-function-paren": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "memberLike",
        "modifiers": ["private"],
        "format": ["camelCase"],
        "leadingUnderscore": "require"
      },
      {
        "selector": "variable",
        "types": ["boolean"],
        "format": ["PascalCase"],
        "prefix": ["is", "should", "has", "can", "did", "will"]
      },
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE", "PascalCase"]
      },
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": { "regex": "^I[A-Z]", "match": true }
      },
      {
        "selector": ["variable"],
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": ["function"],
        "format": ["PascalCase", "camelCase"]
      },
      {
        "selector": ["enumMember", "enum"],
        "format": ["PascalCase"]
      }
    ],
  },
})
