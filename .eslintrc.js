module.exports = {
  root: true,
  ignorePatterns: [
    'app/**/*', // ignore nodeJs files
    'dist/**/*',
    'release/**/*',
  ],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
      plugins: ['unused-imports', '@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:prettier/recommended',
      ],
      rules: {
        'unused-imports/no-unused-imports': 'error',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        'max-len': [
          'error',
          {
            code: 100,
            ignoreComments: true,
            ignoreUrls: true,
            ignorePattern: '^import .*',
          },
        ],
        'no-console': [
          'error',
          {
            allow: process.env.NODE_ENV === 'production' ? ['warn', 'error'] : ['warn', 'error'],
          },
        ],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: 'app', style: 'camelCase' },
        ],
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: 'app', style: 'kebab-case' },
        ],
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: true,
          },
        ],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        'max-len': [
          'error',
          {
            code: 100,
            ignoreComments: true,
            ignoreUrls: true,
          },
        ],
      },
    },
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': ['error', { parser: 'angular' }],
      },
    },
    {
      files: ['*.js'],
      parserOptions: {
        ecmaVersion: 2020,
      },
      // env: {
      //   es6: true,
      // },
    },
  ],
};
