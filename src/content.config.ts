import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  archiveSettingsSchema,
  blogEntrySchema,
  footerSettingsSchema,
  homepageSettingsSchema,
  interfaceSettingsSchema,
  navigationSettingsSchema,
  policyEntrySchema,
  projectEntrySchema,
  siteSettingsSchema,
  systemStatesSettingsSchema,
} from '@/content/schemas';

const settingsBase = './src/content/cms/settings';

const siteSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'site.json' }), schema: siteSettingsSchema });
const navigationSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'navigation.json' }), schema: navigationSettingsSchema });
const homepageSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'homepage.json' }), schema: homepageSettingsSchema });
const interfaceSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'interface.json' }), schema: interfaceSettingsSchema });
const archiveSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'archive.json' }), schema: archiveSettingsSchema });
const footerSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'footer.json' }), schema: footerSettingsSchema });
const systemStatesSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: 'system-states.json' }), schema: systemStatesSettingsSchema });
const projects = defineCollection({ loader: glob({ base: './src/content/cms/projects', pattern: '*.json' }), schema: projectEntrySchema });
const blog = defineCollection({ loader: glob({ base: './src/content/cms/blog', pattern: '*.json' }), schema: blogEntrySchema });
const policies = defineCollection({ loader: glob({ base: './src/content/cms/policies', pattern: '*.json' }), schema: policyEntrySchema });

export const collections = {
  siteSettings,
  navigationSettings,
  homepageSettings,
  interfaceSettings,
  archiveSettings,
  footerSettings,
  systemStatesSettings,
  projects,
  blog,
  policies,
};
