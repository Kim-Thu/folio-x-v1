import { z } from "astro/zod";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const taxonomyTermSchema = z.object({
  label: z.string().min(1),
  slug: slugSchema,
});

export const blogEntrySchema = z.object({
  order: z.number().int().positive(),
  readingMinutes: z.number().int().positive(),
  slug: slugSchema,
  category: z.string().min(1),
  categorySlug: slugSchema,
  tags: z.array(taxonomyTermSchema).min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: z.iso.date(),
  author: z.string().min(1),
  image: z.string().min(1),
  imageAlt: z.string().min(1),
});
