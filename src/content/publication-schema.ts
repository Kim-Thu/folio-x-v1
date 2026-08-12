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

const readerBaseSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
  publishedAt: z.iso.date(),
  publishedLabel: z.string().min(1),
  readTime: z.string().min(1),
  views: z.string().min(1),
});

const proseChapterSchema = readerBaseSchema.extend({
  kind: z.literal("prose"),
  prose: z.array(z.object({
    kind: z.enum(["paragraph", "emphasis", "separator"]).optional(),
    text: z.string().min(1),
  })).min(1),
});

const sequentialMediaChapterSchema = readerBaseSchema.extend({
  kind: z.literal("sequential-media"),
  images: z.array(imageSchema).min(1),
});

const readerChapterSchema = z.discriminatedUnion("kind", [
  proseChapterSchema,
  sequentialMediaChapterSchema,
]);

export const publicationEntrySchema = z.object({
  order: z.number().int().positive(),
  slug: slugSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  cover: imageSchema,
  genres: z.array(taxonomyTermSchema).min(1),
  status: z.enum(["complete", "ongoing"]),
  rating: z.number().min(0).max(5),
  views: z.string().min(1),
  chapters: z.number().int().nonnegative(),
  updatedLabel: z.string().min(1),
  author: z.string().min(1),
  detail: z.object({
    language: z.string().min(1).optional(),
    followers: z.string().min(1).optional(),
    description: z.array(z.string().min(1)).min(1).optional(),
    tags: z.array(taxonomyTermSchema).min(1).optional(),
    reader: z.array(readerChapterSchema).optional(),
  }),
}).superRefine((entry, ctx) => {
  const chapters = entry.detail.reader ?? [];
  const chapterNumbers = chapters.map((chapter) => chapter.number);
  if (new Set(chapterNumbers).size !== chapterNumbers.length) {
    ctx.addIssue({ code: "custom", path: ["detail", "reader"], message: "Reader chapter numbers must be unique" });
  }
  if (chapters.some((chapter) => chapter.number > entry.chapters)) {
    ctx.addIssue({ code: "custom", path: ["detail", "reader"], message: "Reader chapter number cannot exceed publication chapter count" });
  }
});
