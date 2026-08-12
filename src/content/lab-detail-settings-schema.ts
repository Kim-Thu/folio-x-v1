import { z } from "astro/zod";

const cardTemplateSchema = z.enum([
  "stacked", "horizontal", "overlay", "featured", "boxed", "compact-media",
  "compact-bordered", "editorial", "icon-panel", "icon-summary", "media-banner",
  "media-caption", "media-details", "media-only", "media-summary", "media-metrics",
]);
const cardLayoutSchema = z.enum([
  "grid", "list", "three-column", "twelve-column", "content-three-column",
  "mosaic", "asymmetric", "showcase",
]);
const cardColumnsSchema = z.union([
  z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
]);
const cardGapSchema = z.enum(["none", "sm", "md", "lg", "xl"]);
const sectionSettingsSchema = z.object({
  theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
  spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
  container: z.enum(["site", "content", "none"]),
});
const cardPresentationSchema = z.object({
  template: cardTemplateSchema,
  layout: cardLayoutSchema,
  columns: cardColumnsSchema,
  gap: cardGapSchema,
});

export const labDetailSettingsSchema = z.object({
  page: z.object({
    template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
  }),
  header: z.object({
    id: z.string().min(1),
    template: z.literal("media-aside"),
    settings: sectionSettingsSchema,
    labels: z.object({
      breadcrumb: z.string().min(1),
      collection: z.string().min(1),
      actionsTemplate: z.string().includes("{title}"),
      live: z.string().min(1),
      source: z.string().min(1),
      technologyTemplate: z.string().includes("{title}"),
    }),
    routes: z.object({
      base: z.string().min(1),
      categoryBase: z.string().min(1),
      technologyBase: z.string().min(1),
    }),
    metrics: z.array(z.object({
      icon: z.string().min(1),
      source: z.enum(["stars", "forks", "updatedLabel"]),
    })).min(1),
    actions: z.object({
      live: z.object({ icon: z.string().min(1), variant: z.enum(["primary", "outline"]) }),
      source: z.object({ icon: z.string().min(1), variant: z.enum(["primary", "outline"]) }),
    }),
  }),
  navigation: z.object({
    labelTemplate: z.string().includes("{title}"),
    settings: sectionSettingsSchema,
    appearance: z.literal("underline"),
    tone: z.literal("light"),
  }),
  content: z.object({
    id: z.string().min(1),
    settings: sectionSettingsSchema,
    appearance: z.literal("compact"),
    featureCards: cardPresentationSchema,
  }),
  sidebar: z.object({
    labelTemplate: z.string().includes("{title}"),
    projectInformationTitle: z.string().min(1),
  }),
  gallery: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    openImageLabel: z.string().min(1),
    imageTitleLabel: z.string().min(1),
    settings: sectionSettingsSchema,
    cards: cardPresentationSchema,
  }),
  resources: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    actionIcon: z.literal("arrowUpRight"),
    settings: sectionSettingsSchema,
    cards: cardPresentationSchema,
  }),
  related: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    actionLabel: z.string().min(1),
    actionIcon: z.literal("arrowRight"),
    metricIcon: z.literal("star"),
    settings: sectionSettingsSchema,
    cards: cardPresentationSchema,
    slots: z.object({
      excerpt: z.boolean(),
      tags: z.boolean(),
      action: z.boolean(),
    }),
  }),
});
