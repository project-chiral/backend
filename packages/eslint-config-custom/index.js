module.exports = {
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['packages/**/tsconfig.json', 'apps/**/tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'unused-imports',
  ],
  extends: [
    '@antfu',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // @nestjs/swagger需要类型标注来自动生成swagger文档
    '@typescript-eslint/no-inferrable-types': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'curly': ['error', 'all'],
    'max-statements-per-line': ['error', { max: 2, },],
    'no-console': 'warn',

    // 自动删除未使用的 import
    'no-unused-vars': 'off',
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ]
  },
};
