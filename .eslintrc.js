module.exports = {
    "extends": "react-app",
    "rules": {
        "semi": [2, "always"],
        "no-undef": "error",
        /* "space-before-blocks": [
          "error",
          "always"
        ], */
       /*  "space-before-function-paren": [
          "error",
          "always"
        ], */
        "indent": [
            "error",
            1
          ],
        "no-unused-vars":["error", 
        { 
            "vars": "all",
            "varsIgnorePattern": "[1App,React]",
            "args": "after-used", 
            "ignoreRestSiblings": false,
            "caughtErrors": "all",
            "caughtErrorsIgnorePattern": "^ignore"
        }
        ]
    },
    "plugins": [
        "react", 
        "import",    
        "flowtype",
        "jsx-a11y"
      ],

};