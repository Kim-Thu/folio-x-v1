import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://folio-x-v1.netlify.app',
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
  ],
  build: {
    // CSS must remain external in production. The project does not allow
    // generated <style> blocks or inline/internal CSS in built HTML.
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep application assets external so browsers can cache them and CSP
      // does not need to permit inline application resources.
      assetsInlineLimit: 0,
    },
  },
});
