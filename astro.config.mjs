import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { siteOrigin } from './site.config.mjs';

export default defineConfig({
  site: siteOrigin,
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
