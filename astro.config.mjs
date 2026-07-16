import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://folio-x-v1.netlify.app',
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep application scripts external so browsers can cache them and CSP
      // does not need to permit inline JavaScript.
      assetsInlineLimit: 0,
    },
  },
});
