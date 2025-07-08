// eslint.config.cjs

const { FlatCompat } = require("@eslint/eslintrc");
const tsParser = require("@typescript-eslint/parser");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends("plugin:@angular-eslint/recommended"),
  ...compat.plugins("import"),

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.app.json"],
        tsconfigRootDir: __dirname, // ✅ важно для корректного парсинга
        sourceType: "module",
        ecmaVersion: "latest", // ✅ желательно
      },
    },
    rules: {
      // ✅ Сортировка импортов с автофиксом
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];
