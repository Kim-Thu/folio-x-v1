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

const contentSectionSchema = z.object({
	title: z.string().min(1),
	paragraphs: z.array(z.string().min(1)).min(1),
});

const sectionSettingsSchema = z.object({
	theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
	spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
	container: z.enum(["site", "content", "none"]),
});

const projectHeaderSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("page-header"),
	template: z.literal("slider-aside"),
	settings: sectionSettingsSchema,
	content: z.object({
		backAction: z.object({ label: z.string().min(1), href: z.string().min(1) }),
		galleryLabel: z.string().min(1),
		previousImageLabel: z.string().min(1),
		nextImageLabel: z.string().min(1),
		tagsLabel: z.string().min(1),
		actionsLabel: z.string().min(1),
		liveActionLabel: z.string().min(1),
		sourceActionLabel: z.string().min(1),
		asideDecoration: imageSchema,
		facts: z.object({
			clientLabel: z.string().min(1),
			roleLabel: z.string().min(1),
			durationLabel: z.string().min(1),
		}),
	}),
});

const projectArticleSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("article"),
	settings: sectionSettingsSchema,
	content: z.object({ source: z.literal("sections") }),
});

const projectReviewsSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("reviews"),
	settings: sectionSettingsSchema,
	content: z.object({ source: z.literal("detail.reviews") }),
});

const projectNavigationSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("post-navigation"),
	template: z.literal("split"),
	settings: sectionSettingsSchema,
	content: z.object({
		label: z.string().min(1),
		previousLabel: z.string().min(1),
		nextLabel: z.string().min(1),
	}),
});

const projectDetailPageSchema = z.object({
	template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
	sections: z.array(
		z.discriminatedUnion("type", [
			projectHeaderSectionSchema,
			projectArticleSectionSchema,
			projectReviewsSectionSchema,
			projectNavigationSectionSchema,
		]),
	),
});

const projectReviewsSchema = z.object({
	eyebrow: z.string().min(1),
	title: z.string().min(1),
	summary: z.object({
		score: z.number(),
		maximum: z.number().positive(),
		totalLabel: z.string().min(1),
		distribution: z.array(z.object({ label: z.string().min(1), value: z.number() })),
	}),
	items: z.array(
		z.object({
			name: z.string().min(1),
			date: z.string().min(1),
			quote: z.string().min(1),
			rating: z.number(),
			avatar: imageSchema.optional(),
		}),
	),
});

export const projectEntrySchema = z.object({
	order: z.number().int().positive(),
	slug: slugSchema,
	title: z.string().min(1),
	client: z.string().min(1),
	year: z.string().min(1),
	category: z.string().min(1),
	categorySlug: slugSchema,
	tags: z.array(taxonomyTermSchema).min(1),
	summary: z.string().min(1),
	outcome: z.string().min(1),
	image: z.string().min(1),
	alt: z.string(),
	tone: z.enum(["light", "dark"]),
	sections: z.array(contentSectionSchema).min(1),
	detail: z
		.object({
			role: z.string().min(1),
			duration: z.string().min(1),
			showBackAction: z.boolean().optional(),
			liveUrl: z.string().min(1).optional(),
			sourceUrl: z.string().min(1).optional(),
			features: z.array(
				z.object({
					title: z.string().min(1),
					description: z.string().min(1),
					icon: z.enum(["folder01", "userCircle", "calendar03", "lightBulb"]),
				}),
			),
			gallery: z.array(imageSchema),
			results: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })),
			reviews: projectReviewsSchema.optional(),
			testimonial: z
				.object({ quote: z.string().min(1), name: z.string().min(1), role: z.string().min(1) })
				.optional(),
			page: projectDetailPageSchema.optional(),
		})
		.optional(),
});
