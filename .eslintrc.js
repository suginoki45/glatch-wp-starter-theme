module.exports = {
	extends: ["wordpress", "plugin:prettier/recommended"],
	parser: "babel-eslint",
	parserOptions: {
		sourceType: "module",
	},
	rules: {
		"no-var": "error",
	},
};
