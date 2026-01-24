import prettierPlugin from 'eslint-plugin-prettier';

export default [
	{
		files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				browser: true,
				node: true,
			},
		},
		ignores: ['build/', '.svelte-kit/', 'dist/'],
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			curly: 'error',
			eqeqeq: ['error', 'smart'],
			'no-lonely-if': 'error',
			'no-var': 'error',
			'prefer-const': ['error', { destructuring: 'all' }],
			'arrow-body-style': ['error', 'as-needed'],
			quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'prefer-arrow-callback': 'error',
			'object-shorthand': 'error',
			'no-shadow': ['error', { builtinGlobals: false }],
			'spaced-comment': ['error', 'always'],
			'no-nested-ternary': 'error',
			'array-callback-return': ['error', { allowImplicit: true, checkForEach: true }],
			'func-style': ['error', 'expression'],
			'eol-last': ['error', 'always'],
			'no-use-before-define': 'off',
			'newline-before-return': 'warn',
			'sort-imports': ['error', { ignoreDeclarationSort: true }],
			'no-undef': 'off',
			'prettier/prettier': 'error',
		},
	},
];
