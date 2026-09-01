import { z } from "astro/zod";
import { pageSectionSchema } from "@/content/schemas";
import { pageSeoSchema } from "@/content/seo-schema";

const pageLayoutSchema = z.object({
	template: z.enum([
		"home",
		"stacked",
		"lead-content",
		"lead-content-closing",
		"lead-content-navigation",
		"lead-navigation-content",
	]),
});

export const pageSchema = z.object({
	slug: z.string(),
	meta: z.object({
		title: z.string(),
		description: z.string().optional(),
		author: z.string().optional(),
		publishedAt: z.string().optional(),
		updatedAt: z.string().optional(),
	}),
	seo: pageSeoSchema.nullable().optional(),
	content: z.object({
		layout: pageLayoutSchema,
		sections: z.array(pageSectionSchema),
	}),
});
