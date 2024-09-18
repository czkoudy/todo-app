import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      'typescript-sort-keys': typescriptSortKeys,
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'typescript-sort-keys/interface': 'warn',
      'typescript-sort-keys/string-enum': 'warn',
      'sort-keys-fix/sort-keys-fix': 'warn',
      eqeqeq: ['error', 'always'],
      '@typescript-eslint/naming-convention': [
        'error',
        { format: ['PascalCase'], selector: 'typeLike' },
        { format: ['PascalCase'], selector: 'enumMember' },
      ],
    },
  }
);
