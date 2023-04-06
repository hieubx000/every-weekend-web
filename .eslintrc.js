module.exports = {
  env: {
    browser: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
    "google",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  ignorePatterns: ["demo/**/*.['js','ts','tsx']"],
  rules: {
    "require-jsdoc": 0,
    "linebreak-style": 0,
    "max-len": ["error", { code: 150 }],
    "@next/next/no-img-element": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
