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

const cardPresentationSchema = z.object({
  template: cardTemplateSchema,
  layout: cardLayoutSchema,
  columns: cardColumnsSchema,
  gap: cardGapSchema,
});

export const labDetailSettingsSchema = z.object({
  navigation: z.object({
    labelTemplate: z.string().includes("{title}"),
  }),
  sidebar: z.object({
    labelTemplate: z.string().includes("{title}"),
    projectInformationTitle: z.string().min(1),
  }),
  resources: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    actionIcon: z.literal("arrowUpRight"),
    cards: cardPresentationSchema,
  }),
  related: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    actionLabel: z.string().min(1),
    metricIcon: z.literal("star"),
    cards: cardPresentationSchema,
    slots: z.object({
      excerpt: z.boolean(),
      tags: z.boolean(),
      action: z.boolean(),
    }),
  }),
});
