import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';

export default [
	// Ignore generated output
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', 'sanity.types.ts'],
	},

	// Base JS rules
	js.configs.recommended,

	// TypeScript files
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			'no-undef': 'off',
		},
	},

	// Svelte files
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser,
			},
			globals: {
				...globals.browser,
			},
		},
		plugins: {
			svelte,
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...svelte.configs.recommended.rules,

			// Svelte + TS realities
			'no-undef': 'off',
			'func-style': 'off',

			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},

	// Project-wide stylistic + correctness rules
	{
		rules: {
			curly: 'error',
			eqeqeq: ['error', 'smart'],
			'no-lonely-if': 'error',
			'no-var': 'error',
			'prefer-const': ['error', { destructuring: 'all' }],
			'arrow-body-style': ['error', 'as-needed'],
			quotes: ['error', 'single', { avoidEscape: true }],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'prefer-arrow-callback': 'error',
			'object-shorthand': 'error',
			'no-shadow': 'error',
			'spaced-comment': ['error', 'always'],
			'no-nested-ternary': 'error',
			'array-callback-return': ['error', { allowImplicit: true }],
			'func-style': ['error', 'expression'],
			'eol-last': ['error', 'always'],
			'newline-before-return': 'warn',
			'sort-imports': ['error', { ignoreDeclarationSort: true }],
		},
	},

	// Disable formatting rules handled by Prettier
	prettier,
];
