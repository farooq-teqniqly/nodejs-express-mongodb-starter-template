import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import jestPlugin from "eslint-plugin-jest";

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest, ...globals.node },
      sourceType: "module",
    },
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    plugins: {
      prettier,
      jest: jestPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      semi: ["warn", "always"],
      ...jestPlugin.configs.recommended.rules,
    },
  },
];
