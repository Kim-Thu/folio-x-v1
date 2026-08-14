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

const iconSchema = z.enum([
  "arrowLeft", "arrowRight", "arrowUp", "arrowUpRight", "arrowPath",
  "archiveBox", "bars3", "bolt", "chevronLeft", "chevronDown",
  "chevronRight", "github", "globeAlt", "lightBulb", "linkedin", "xMark",
  "folder01", "facebook", "link", "twitter", "userCircle", "calendar03",
  "check", "clock01", "gridView", "listView", "play", "search",
  "shoppingBag", "star", "questionMarkCircle", "bookOpen", "bookmark",
  "eye", "lockClosed", "adjustmentsHorizontal", "moon", "handThumbUp",
  "heart", "faceSmile", "faceFrown",
]);

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
  caption: z.string().min(1).optional(),
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

const quoteBlockSchema = z.object({
  type: z.literal("quote"),
  text: z.string().min(1),
  attribution: z.string().min(1).optional(),
  source: z.string().min(1).optional(),
  sourceUrl: z.string().min(1).optional(),
});

const calloutBlockSchema = z.object({
  type: z.literal("callout"),
  tone: z.enum(["neutral", "info", "success", "warning", "danger"]),
  title: z.string().min(1).optional(),
  text: z.string().min(1),
  icon: iconSchema.optional(),
});

const codeBlockSchema = z.object({
  type: z.literal("code"),
  code: z.string().min(1),
  language: z.string().min(1).optional(),
  filename: z.string().min(1).optional(),
  caption: z.string().min(1).optional(),
});

const dividerBlockSchema = z.object({
  type: z.literal("divider"),
  style: z.enum(["subtle", "solid", "dashed"]).default("subtle"),
});

const mediaBlockSchema = z.object({
  type: z.literal("media"),
  mediaType: z.enum(["video", "embed"]),
  src: z.string().min(1),
  title: z.string().min(1),
  caption: z.string().min(1).optional(),
  poster: imageSchema.optional(),
  aspectRatio: z.enum(["square", "portrait", "landscape", "video", "editorial"]).optional(),
  controls: z.boolean().default(true),
  autoplay: z.boolean().default(false),
});

const metricGridBlockSchema = z.object({
  type: z.literal("metric-grid"),
  id: slugSchema.optional(),
  title: z.string().min(1).optional(),
  navigationLabel: z.string().min(1).optional(),
  items: z.array(z.object({
    label: z.string().min(1),
    value: z.string().min(1),
    description: z.string().min(1).optional(),
    icon: iconSchema.optional(),
  })).min(1),
}).refine(
  (block) => !block.navigationLabel || Boolean(block.id),
  { message: "metric-grid requires id when navigationLabel is set", path: ["id"] },
);

export const labContentBlockSchema = z.discriminatedUnion("type", [
  headingBlockSchema,
  paragraphBlockSchema,
  imageBlockSchema,
  featureGridBlockSchema,
  listBlockSchema,
  tableBlockSchema,
  quoteBlockSchema,
  calloutBlockSchema,
  codeBlockSchema,
  dividerBlockSchema,
  mediaBlockSchema,
  metricGridBlockSchema,
]);

const labGalleryItemSchema = imageSchema.extend({
  caption: z.string().min(1).optional(),
});

const labResourceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
  icon: iconSchema,
  actionLabel: z.string().min(1),
});

const labFactSchema = z.object({
  key: slugSchema,
  label: z.string().min(1),
  value: z.string().min(1),
});

const labRelatedSchema = z.object({
  slugs: z.array(slugSchema).min(1).max(4),
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
  gallery: z.array(labGalleryItemSchema).min(1),
  resources: z.array(labResourceSchema).min(1),
  facts: z.array(labFactSchema).min(1),
  related: labRelatedSchema,
}).superRefine((lab, ctx) => {
  const contentIds = lab.content.flatMap((block) => "id" in block && block.id ? [block.id] : []);
  if (new Set(contentIds).size !== contentIds.length) {
    ctx.addIssue({ code: "custom", message: "Lab content block ids must be unique", path: ["content"] });
  }

  const factKeys = lab.facts.map((fact) => fact.key);
  if (new Set(factKeys).size !== factKeys.length) {
    ctx.addIssue({ code: "custom", message: "Lab fact keys must be unique", path: ["facts"] });
  }

  if (new Set(lab.related.slugs).size !== lab.related.slugs.length) {
    ctx.addIssue({ code: "custom", message: "Related lab slugs must be unique", path: ["related", "slugs"] });
  }

  if (lab.related.slugs.includes(lab.slug)) {
    ctx.addIssue({ code: "custom", message: "A lab cannot relate to itself", path: ["related", "slugs"] });
  }
});
