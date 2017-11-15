module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
    },
    "plugins": [
        "react",
        "import"
    ],
    "rules": {
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "warn"
        ],
        "no-unused-vars": [
            "warn"
        ],
        "no-global-assign": [
            "error"
        ],
        "valid-typeof": [
            "error"
        ],

        "indent": [
            "off",
            4
        ],
        "linebreak-style": [
            "warn",
            "windows"
        ],
        "quotes": [
            "warn",
            "single"
        ]
    }
};