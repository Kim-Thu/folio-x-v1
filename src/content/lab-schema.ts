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
  content: z.string().min(1),
  gallery: z.array(labGalleryItemSchema).min(1),
  resources: z.array(labResourceSchema).min(1),
  facts: z.array(labFactSchema).min(1),
  related: labRelatedSchema,
}).superRefine((lab, ctx) => {
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
