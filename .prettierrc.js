const styleguide = require('@vercel/style-guide/prettier');

module.exports = {
  ...styleguide,
  tailwindConfig: './tailwind.config.ts',
  plugins: [...styleguide.plugins, 'prettier-plugin-tailwindcss'],
};
