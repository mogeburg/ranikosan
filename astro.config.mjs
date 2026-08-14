import { defineConfig } from 'astro/config';

const BASE = '/ranikosan';

export default defineConfig({
  base: BASE,
  site: 'https://mogeburg.github.io',
  build: {
    inlineStylesheets: 'always',
  },
  redirects: {
    '/otegaki': `${BASE}/#otegaki`,
  },
});
