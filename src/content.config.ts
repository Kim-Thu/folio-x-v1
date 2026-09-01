import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { projectEntrySchema } from "@/content/project-schema";
import { labEntrySchema } from "@/content/lab-schema";
import { labDetailSettingsSchema } from "@/content/lab-detail-settings-schema";
import { blogEntrySchema } from "@/content/blog-schema";
import { blogDetailSettingsSchema } from "@/content/blog-detail-settings-schema";
import { publicationEntrySchema } from "@/content/publication-schema";
import { publicationDetailSettingsSchema } from "@/content/publication-detail-settings-schema";
import { publicationCatalogSettingsSchema } from "@/content/publication-catalog-settings-schema";
import { pageSchema } from "@/content/page-schema";
import {
  closingProfileSettingsSchema,
  footerSettingsSchema,
  interfaceSettingsSchema,
  navigationSettingsSchema,
  productEntrySchema,
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
const blogDetailSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: "blog-detail.json" }), schema: blogDetailSettingsSchema });
const publicationDetailSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: "publication-detail.json" }), schema: publicationDetailSettingsSchema });
const publicationCatalogSettings = defineCollection({ loader: glob({ base: settingsBase, pattern: "publication-catalog.json" }), schema: publicationCatalogSettingsSchema });
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
  blogDetailSettings,
  publicationDetailSettings,
  publicationCatalogSettings,
  projects,
  products,
  labs,
  blog,
  comics,
  novels,
  pages,
};
