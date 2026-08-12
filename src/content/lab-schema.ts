import { z } from "astro/zod";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const taxonomyTermSchema = z.object({
  label: z.string().min(1),
  slug: slugSchema,
});
const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
const featureSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.enum(["lightBulb", "bolt", "globeAlt", "arrowPath"]),
});

const headingBlockSchema = z.object({
  type: z.literal("heading"),
  id: slugSchema,
  level: z.union([z.literal(2), z.literal(3)]),
  text: z.string().min(1),
  navigationLabel: z.string().min(1).optional(),
});
const paragraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  text: z.string().min(1),
});
const imageBlockSchema = z.object({
  type: z.literal("image"),
  image: imageSchema,
});
const featureGridBlockSchema = z.object({
  type: z.literal("feature-grid"),
  id: slugSchema,
  title: z.string().min(1),
  navigationLabel: z.string().min(1).optional(),
  items: z.array(featureSchema).min(1),
});
const listBlockSchema = z.object({
  type: z.literal("list"),
  style: z.enum(["bullet", "ordered"]),
  items: z.array(z.string().min(1)).min(1),
});
const tableBlockSchema = z.object({
  type: z.literal("table"),
  id: slugSchema.optional(),
  caption: z.string().min(1).optional(),
  columns: z.array(z.object({ key: slugSchema, label: z.string().min(1) })).min(1),
  rows: z.array(z.record(z.string(), z.string())).min(1),
});

export const labContentBlockSchema = z.discriminatedUnion("type", [
  headingBlockSchema,
  paragraphBlockSchema,
  imageBlockSchema,
  featureGridBlockSchema,
  listBlockSchema,
  tableBlockSchema,
]);

const labGalleryItemSchema = imageSchema.extend({
  caption: z.string().min(1).optional(),
});

const labResourceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
  icon: z.enum(["folder01", "github", "play"]),
  actionLabel: z.string().min(1).optional(),
});

const labFactSchema = z.object({
  key: slugSchema,
  label: z.string().min(1),
  value: z.string().min(1),
});

const labRelatedSchema = z.object({
  slugs: z.array(slugSchema).max(4).default([]),
});

export const labEntrySchema = z.object({
  order: z.number().int().positive(),
  slug: slugSchema,
  title: z.string().min(1),
  category: taxonomyTermSchema,
  status: z.enum(["experiment", "in-progress", "complete"]),
  statusLabel: z.string().min(1),
  summary: z.string().min(1),
  image: imageSchema,
  technologies: z.array(taxonomyTermSchema).min(1),
  stars: z.number().int().nonnegative(),
  forks: z.number().int().nonnegative(),
  updatedLabel: z.string().min(1),
  liveUrl: z.string().min(1).optional(),
  sourceUrl: z.string().min(1).optional(),
  content: z.array(labContentBlockSchema).min(1),
  gallery: z.array(labGalleryItemSchema).default([]),
  resources: z.array(labResourceSchema).default([]),
  facts: z.array(labFactSchema).default([]),
  related: labRelatedSchema.default({ slugs: [] }),
});
