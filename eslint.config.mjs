// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default [{
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    rules: {
        "prefer-const": "warn",
        "no-constant-binary-expression": "error",
    },
}, eslintConfigPrettier];