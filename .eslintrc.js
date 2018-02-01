module.exports = {
    extends: "airbnb",
    plugins: ["react"],
    env: {
      browser: true,
    },
    parser: "babel-eslint",
    rules: {
      "no-tabs": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "comma-dangle": ["error", {
        arrays: "always-multiline",
        objects: "always",
        imports: "always",
        exports: "always",
        functions: "always-multiline",
      }],
      "react/jsx-filename-extension": ["error", { "extensions": [".js"], }],
      "react/jsx-curly-spacing": ["error", "always", { "allowMultiline": true, }],
	  	// enforce spacing inside array brackets
      'array-bracket-spacing': ['error', 'always'],
      'react/forbid-prop-types': ["off", { forbid: ['any', 'array', 'object'], }],
    },
};