module.exports = {
  root: true,
  ignorePatterns: [
    'app/**/*', // ignore nodeJs files
    'dist/**/*',
    'release/**/*',
  ],
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', '@angular-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'max-len': [
      'error',
      {
        code: 100,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
      rules: {
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
      rules: {},
    },
  ],
};
