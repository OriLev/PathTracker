module.exports = {
    "extends": "airbnb",
    "plugins": ["react"],
    "rules": {
    	"no-tabs": "off",
    	"react/jsx-uses-react": 2,
    	"react/jsx-uses-vars": 2,
  		"comma-dangle": ["error", {
	  	  "arrays": "always-multiline",
	  	  "objects": "always",
	  	  "imports": "never",
	  	  "exports": "never",
	  	  "functions": "always-multiline"
	  	}],
	  	"react/jsx-filename-extension": ["error", { "extensions": [".js"] }],
	  	"react/jsx-curly-spacing": ["error", "always", { "allowMultiline": true }],
	  	// enforce spacing inside array brackets
	  	'array-bracket-spacing': ['error', 'always'],
	  	'react/forbid-prop-types': [0, { forbid: ['any', 'array', 'object'] }],
   	},
   	"globals": {
   		"window": true,
   		"document": true,
   	}
};