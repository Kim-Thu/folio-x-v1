import { z } from "astro/zod";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const taxonomyTermSchema = z.object({
  label: z.string().min(1),
  slug: slugSchema,
});
const contentNodeSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), id: slugSchema, level: z.union([z.literal(2), z.literal(3)]), text: z.string().min(1) }),
  z.object({ type: z.literal("paragraph"), text: z.string().min(1) }),
  z.object({ type: z.literal("image"), image: z.object({ src: z.string().min(1), alt: z.string(), width: z.number().int().positive(), height: z.number().int().positive() }) }),
]);

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
  content: z.array(contentNodeSchema).min(1),
}).superRefine((entry, ctx) => {
  const headingIds = entry.content
    .filter((node): node is Extract<typeof node, { type: "heading" }> => node.type === "heading")
    .map((node) => node.id);
  if (new Set(headingIds).size !== headingIds.length) {
    ctx.addIssue({ code: "custom", message: "Blog content heading ids must be unique", path: ["content"] });
  }
});
