import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import i18next from "eslint-plugin-i18next";
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins:{
      i18next
    },
    rules:{
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "arrow-parens": ["error", "always"],
      "no-unused-expressions": "error",
      "no-unused-vars": ["error", { "argsIgnorePattern": "_" }],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "object-curly-spacing": ["error", "always"],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }],
      "no-duplicate-imports": "error",
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "directive", "next": "*" } // adds line after 'use client'
      ],
      "max-len": [2, {
        "code": 112,
        "comments": 150,
        "ignorePattern": "^import\\s.+\\sfrom\\s.+;$", // max-length warning disabled for imports
        "ignoreUrls": true
      }],
      "i18next/no-literal-string": ["error", { // this rule prevent writing texts without i18n
        "markupOnly": true,
        "ignoreAttribute": ["id", "name", "key", "class"]
      }],
      "no-return-await": "error",
      "no-unreachable": "error",
      "no-multi-spaces": ["error", {
        "ignoreEOLComments": false // also catch multi-spaces before inline comments
      }],
      "react/jsx-key": "error",
      "react/jsx-no-undef": ["error", { "allowGlobals": true }],
      "react/jsx-uses-react": "error",
      "react/jsx-pascal-case": ["error", {
        "allowAllCaps": true
      }],
      "react/jsx-sort-props": ["error", {
        "callbacksLast": true,
        "shorthandFirst": true,
        "noSortAlphabetically": false,
        "reservedFirst": true
      }],
      "react/react-in-jsx-scope": "off",
      "@next/next/no-img-element": "error"
    },
  }
]);

export default eslintConfig;
