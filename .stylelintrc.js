module.exports = {
	plugins: ['stylelint-scss'],
	extends: [
		'stylelint-config-wordpress/scss',
		'stylelint-config-rational-order',
		'stylelint-prettier/recommended'
	],
	rules: {
		'no-descending-specificity': null,
	}
};
