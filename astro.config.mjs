// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Canonical site URL — used by sitemap, RSS and canonical/OG tags.
  site: 'https://fspsicologiaclinica.com.br',
  // Clean, stable URLs: /blog/slug-do-post (no trailing slash, no .html).
  trailingSlash: 'never',
  build: {
    // Emit /blog/slug.html instead of /blog/slug/index.html so URLs stay flat.
    format: 'file',
  },
  integrations: [
    mdx(),
    sitemap(),
  ],
});
