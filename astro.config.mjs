import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://folio-x-v1.netlify.app',
  build: {
    // Keep CSS authored in stylesheets while removing the extra render-blocking
    // request from the production document. CSP hashes are generated post-build.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep application scripts external so browsers can cache them and CSP
      // does not need to permit inline JavaScript.
      assetsInlineLimit: 0,
    },
  },
});
