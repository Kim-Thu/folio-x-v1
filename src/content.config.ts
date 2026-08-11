import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { projectEntrySchema } from "@/content/project-schema";
import { labDetailSettingsSchema } from "@/content/lab-detail-settings-schema";
import {
  blogEntrySchema,
  closingProfileSettingsSchema,
  footerSettingsSchema,
  pageSchema,
  interfaceSettingsSchema,
  navigationSettingsSchema,
  productEntrySchema,
  labEntrySchema,
  publicationEntrySchema,
  siteSettingsSchema,
  systemStatesSettingsSchema,
} from "@/content/schemas";

const settingsBase = "./src/content/globals";

const siteSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: "site.json" }), schema: siteSettingsSchema });
const navigationSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: "navigation.json" }), schema: navigationSettingsSchema });
const closingProfileSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: "closing-profile.json" }), schema: closingProfileSettingsSchema });
const interfaceSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: "interface.json" }), schema: interfaceSettingsSchema });
const footerSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: "footer.json" }), schema: footerSettingsSchema });
const systemStatesSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: "system-states.json" }), schema: systemStatesSettingsSchema });
const labDetailSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: "lab-detail.json" }), schema: labDetailSettingsSchema });
const projects = defineCollection({ loader: glob({ base: "./src/content/projects", pattern: "*.json" }), schema: projectEntrySchema });
const products = defineCollection({ loader: glob({ base: "./src/content/products", pattern: "*.json" }), schema: productEntrySchema });
const labs = defineCollection({ loader: glob({ base: "./src/content/labs", pattern: "*.json" }), schema: labEntrySchema });
const blog = defineCollection({ loader: glob({ base: "./src/content/blog", pattern: "*.json" }), schema: blogEntrySchema });
const comics = defineCollection({ loader: glob({ base: "./src/content/publications/comics", pattern: "*.json" }), schema: publicationEntrySchema });
const novels = defineCollection({ loader: glob({ base: "./src/content/publications/novels", pattern: "*.json" }), schema: publicationEntrySchema });
const pages = defineCollection({ loader: glob({ base: "./src/content/pages", pattern: "*.json" }), schema: pageSchema });

export const collections = {
  siteSettings,
  navigationSettings,
  closingProfileSettings,
  interfaceSettings,
  footerSettings,
  systemStatesSettings,
  labDetailSettings,
  projects,
  products,
  labs,
  blog,
  comics,
  novels,
  pages,
};
