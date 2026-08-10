import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  archiveSettingsSchema,
  blogEntrySchema,
  closingProfileSettingsSchema,
  footerSettingsSchema,
  pageSchema,
  interfaceSettingsSchema,
  navigationSettingsSchema,
  projectEntrySchema,
  productCatalogSchema,
  labEntrySchema,
  publicationCatalogSchema,
  siteSettingsSchema,
  systemStatesSettingsSchema,
} from '@/content/schemas';

const settingsBase = './src/content/globals';

const siteSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'site.json' }), schema: siteSettingsSchema });
const navigationSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'navigation.json' }), schema: navigationSettingsSchema });
const closingProfileSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'closing-profile.json' }), schema: closingProfileSettingsSchema });
const interfaceSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'interface.json' }), schema: interfaceSettingsSchema });
const archiveSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'archive.json' }), schema: archiveSettingsSchema });
const footerSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'footer.json' }), schema: footerSettingsSchema });
const systemStatesSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'system-states.json' }), schema: systemStatesSettingsSchema });
const projects = defineCollection({ loader: glob({ base: './src/content/projects', pattern: '*.json' }), schema: projectEntrySchema });
const products = defineCollection({ loader: glob({ base: './src/content/products', pattern: '*.json' }), schema: productCatalogSchema });
const labs = defineCollection({ loader: glob({ base: './src/content/labs', pattern: '*.json' }), schema: labEntrySchema });
const blog = defineCollection({ loader: glob({ base: './src/content/blog', pattern: '*.json' }), schema: blogEntrySchema });
const publicationCatalogs = defineCollection({ loader: glob({ base: './src/content/publications', pattern: '*.json' }), schema: publicationCatalogSchema });
const pages = defineCollection({ loader: glob({ base: './src/content/pages', pattern: '*.json' }), schema: pageSchema });

export const collections = {
  siteSettings,
  navigationSettings,
  closingProfileSettings,
  interfaceSettings,
  archiveSettings,
  footerSettings,
  systemStatesSettings,
  projects,
  products,
  labs,
  blog,
  publicationCatalogs,
  pages,
};
