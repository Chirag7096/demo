// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
  semi: true,
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  bracketSpacing: false,
  bracketSameLine: true,
  jsxSingleQuote: false,
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
