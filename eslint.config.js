import { default as pluginJs } from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs}"], // Target only Node.js-related file extensions
    languageOptions: {
      globals: globals.node, // Use Node.js globals
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error", // Keep linting for undefined variables
    },
  },
];
