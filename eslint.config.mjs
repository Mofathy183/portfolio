import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';

export default defineConfig([
	// Base recommended configs
	js.configs.recommended,

	// Base configuration for all TypeScript files
	...tseslint.configs.recommended,

	// Global ignores
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/build/**',
			'**/.turbo/**',
			'**/vite/**',
			'**/components/ui/**',
			'*.config.js',
			'*.config.mjs',
			'*.config.ts',
		],
	},

	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
			},
		},

		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			...reactHooks.configs.recommended.rules,

			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',

			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],

			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['warn'],

			'react/display-name': 'off',
		},
	},

	prettier,
]);
