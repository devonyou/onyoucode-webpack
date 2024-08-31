module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended',
	],
	plugins: ['prettier', '@typescript-eslint'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 4,
				printWidth: 120,
				bracketSpacing: false,
				arrowParens: 'avoid',
				parser: 'flow',
				trailingComma: true,
			},
		],
		CallExpression: {
			arguments: 'first',
		},
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
};
