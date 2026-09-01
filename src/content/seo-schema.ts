import { z } from "astro/zod";

const seoImageSchema = z.object({
	src: z.string().min(1),
	alt: z.string(),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional(),
});

export const pageSeoSchema = z.object({
	title: z.string().min(1).optional(),
	description: z.string().min(1).optional(),
	canonicalPath: z.string().startsWith("/").optional(),
	image: seoImageSchema.optional(),
	robots: z.object({
		index: z.boolean().optional(),
		follow: z.boolean().optional(),
	}).optional(),
}).strict();
