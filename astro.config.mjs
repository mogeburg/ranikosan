import { defineConfig } from 'astro/config';

export default defineConfig({
  base: '/ranikosan',
  site: 'https://mogeburg.github.io',
  build: {
    inlineStylesheets: 'always',
  },
});
