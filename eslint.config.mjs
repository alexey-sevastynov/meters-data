import reactCompiler from "eslint-plugin-react-compiler";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
    baseDirectory: dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            "**/*.ico",
            "**/*.mjs",
            "**/*.d.ts",
            "**/*.css",
            "**/*.svg",
            "**/*.md",
            "node_modules",
            "dist",
            "build",
            "vite.config.ts",
        ],
    },
    ...compat
        .extends(
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:react/recommended",
            "plugin:react/jsx-runtime",
            "plugin:react-hooks/recommended",
            "eslint-config-prettier"
        )
        .map((config) => ({
            ...config,
            files: ["**/*.ts", "**/*.tsx"],
        })),
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "react-compiler": reactCompiler,
            react: react,
            "react-refresh": reactRefresh,
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        rules: {
            "max-lines": ["error", 400],
            "max-lines-per-function": ["error", 90],
            complexity: ["error", { max: 10 }],
            "no-constant-condition": "error",
            "prefer-regex-literals": "error",
            "no-control-regex": "error",
            "no-debugger": "error",
            "no-duplicate-case": "error",
            "no-duplicate-imports": "error",
            "no-empty": "error",
            "no-irregular-whitespace": "error",
            "no-multiple-empty-lines": "error",
            "no-return-await": "error",
            "no-undef-init": "error",
            "no-alert": "error",
            "no-multi-str": "error",
            "no-lone-blocks": "error",
            "no-new-func": "error",
            "react/jsx-no-comment-textnodes": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-compiler/react-compiler": "error",
            eqeqeq: ["error", "always"],
            "space-in-parens": ["error", "never"],
            "default-case": "error",
            "max-len": [
                "error",
                {
                    code: 150,
                    ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
                },
            ],
            "@typescript-eslint/no-unsafe-return": "error",
            "@typescript-eslint/no-unsafe-assignment": "error",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { vars: "all", args: "after-used", ignoreRestSiblings: false },
            ],
            "@typescript-eslint/array-type": [
                "error",
                {
                    default: "array",
                },
            ],
            "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/consistent-type-definitions": "error",
            "@typescript-eslint/explicit-member-accessibility": [
                "error",
                {
                    accessibility: "no-public",
                },
            ],
            "@typescript-eslint/member-ordering": [
                "error",
                {
                    default: {
                        memberTypes: [
                            "public-field",
                            "protected-field",
                            "private-field",
                            "constructor",
                            "public-method",
                        ],
                    },
                },
            ],
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-for-in-array": "error",
            "@typescript-eslint/no-inferrable-types": "error",
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-this-alias": "error",
            "@typescript-eslint/adjacent-overload-signatures": "error",
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "*", next: "function" },
                { blankLine: "always", prev: "function", next: "*" },
                { blankLine: "always", prev: "*", next: "if" },
                { blankLine: "always", prev: "if", next: "*" },
                { blankLine: "always", prev: "*", next: "switch" },
                { blankLine: "always", prev: "switch", next: "*" },
                { blankLine: "always", prev: "*", next: "for" },
                { blankLine: "always", prev: "*", next: "try" },
                { blankLine: "always", prev: "try", next: "*" },
            ],
            "@typescript-eslint/no-unused-expressions": [
                "error",
                {
                    allowShortCircuit: true,
                },
            ],
            "@typescript-eslint/no-var-requires": "error",
            "@typescript-eslint/unbound-method": "error",
            "@typescript-eslint/no-shadow": "error",
            "@typescript-eslint/prefer-for-of": "error",
            "@typescript-eslint/prefer-return-this-type": "error",
            "@typescript-eslint/no-unnecessary-type-arguments": "error",
            "react/jsx-no-useless-fragment": "error",
            "react-hooks/rules-of-hooks": "error",
            "import/no-default-export": "off",
            "import/no-cycle": "off",
        },
    },
];
