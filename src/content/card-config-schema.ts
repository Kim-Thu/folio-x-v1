import { z } from "astro/zod";

export const cardTemplateSchema = z.enum([
	"stacked",
	"horizontal",
	"overlay",
	"featured",
	"boxed",
	"compact-media",
	"compact-bordered",
	"editorial",
	"icon-panel",
	"icon-summary",
	"media-banner",
	"media-caption",
	"media-details",
	"media-only",
	"media-summary",
	"media-metrics",
]);

export const cardLayoutSchema = z.enum([
	"grid",
	"list",
	"three-column",
	"twelve-column",
	"content-three-column",
	"mosaic",
	"asymmetric",
	"showcase",
	"carousel",
]);

export const cardColumnsSchema = z.number().int().min(1).max(5);
export const cardGapSchema = z.enum(["none", "sm", "md", "lg", "xl"]);
export const cardSeparatorSchema = z.enum(["none", "light", "dark"]);
export const mediaRatioSchema = z.enum([
	"editorial",
	"landscape",
	"natural",
	"panoramic",
	"portrait",
	"square",
	"video",
]);

export const cardSlotsSchema = z.object({
	media: z.boolean().optional(),
	icon: z.boolean().optional(),
	metadata: z.boolean().optional(),
	tags: z.boolean().optional(),
	metrics: z.boolean().optional(),
	title: z.boolean().optional(),
	excerpt: z.boolean().optional(),
	action: z.boolean().optional(),
});

export const cardConfigSchema = z.object({
	template: cardTemplateSchema.optional(),
	layout: cardLayoutSchema.optional(),
	columns: cardColumnsSchema.optional(),
	gap: cardGapSchema.optional(),
	mediaRatio: mediaRatioSchema.optional(),
	separator: cardSeparatorSchema.optional(),
	headingLevel: z.number().int().min(1).max(6).optional(),
	slots: cardSlotsSchema.optional(),
});
