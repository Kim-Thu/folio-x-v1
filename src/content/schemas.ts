import { z } from "astro/zod";

export const iconNameSchema = z.enum([
	"arrowLeft",
	"arrowRight",
	"arrowUp",
	"arrowUpRight",
	"arrowPath",
	"archiveBox",
	"bars3",
	"bolt",
	"chevronLeft",
	"chevronDown",
	"chevronRight",
	"github",
	"globeAlt",
	"lightBulb",
	"linkedin",
	"xMark",
	"folder01",
	"facebook",
	"link",
	"twitter",
	"userCircle",
	"calendar03",
	"check",
	"clock01",
	"gridView",
	"listView",
	"play",
	"search",
	"shoppingBag",
	"star",
	"questionMarkCircle",
	"bookOpen",
	"bookmark",
	"eye",
	"lockClosed",
	"adjustmentsHorizontal",
	"moon",
	"handThumbUp",
	"heart",
	"faceSmile",
	"faceFrown",
]);

const buttonVariantSchema = z.enum([
	"primary",
	"secondary",
	"outline",
	"ghost",
	"text",
	"text-subtle",
	"pagination",
	"tab",
	"view",
]);
const buttonSizeSchema = z.enum(["xs", "sm", "md", "lg"]);
const buttonToneSchema = z.enum(["dark", "light"]);
const mediaRatioSchema = z.enum([
	"editorial",
	"landscape",
	"natural",
	"panoramic",
	"portrait",
	"square",
	"video",
]);
const cardTemplateSchema = z.enum([
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
const cardLayoutSchema = z.enum([
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
const cardColumnsSchema = z.number().int().min(1).max(5);
const cardGapSchema = z.enum(["none", "sm", "md", "lg", "xl"]);
const cardSeparatorSchema = z.enum(["none", "light", "dark"]);
const metadataDisplaySchema = z.enum(["icon", "icon-text", "text"]);
const badgeToneSchema = z.enum(["brand", "neutral", "inverse"]);
const cardAppearanceSchema = z.enum(["default", "inverse"]);
const cardItemSizeSchema = z.enum(["standard", "wide"]);

const navigationItemSchema = z.object({
	href: z.string().min(1),
	label: z.string().min(1),
});
const socialLinkSchema = navigationItemSchema.extend({
	shortLabel: z.string().min(1),
	icon: z.enum(["github", "linkedin"]).optional(),
});
const systemStateActionSchema = z.object({
	href: z.string().min(1),
	label: z.string().min(1),
	icon: z
		.enum([
			"arrowLeft",
			"arrowRight",
			"arrowUp",
			"arrowUpRight",
			"chevronLeft",
			"chevronRight",
		])
		.optional(),
});
const imageSchema = z.object({
	src: z.string().min(1),
	alt: z.string(),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
});
const systemStateSchema = z.object({
	id: z.string().min(1),
	displayCode: z.string().min(1).optional(),
	eyebrow: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	primaryAction: systemStateActionSchema,
	secondaryAction: systemStateActionSchema.optional(),
	image: imageSchema,
	metadataTitle: z.string().min(1),
	metadataDescription: z.string().min(1),
});

export const siteSettingsSchema = z.object({
	site: z.object({
		name: z.string().min(1),
		shortName: z.string().min(1),
		role: z.string().min(1),
		location: z.string().min(1),
		email: z.email(),
		logo: z.string().optional(),
		logoLight: z.string().optional(),
		logoDark: z.string().optional(),
		favicon: z.string().optional(),
		contactLabel: z.string().min(1),
	}),
	metadata: z.object({
		language: z.string().min(2),
		title: z.string().min(1),
		description: z.string().min(1),
	}),
});

export const navigationSettingsSchema = z.object({
	navItems: z.array(navigationItemSchema),
	footerNavItems: z.array(navigationItemSchema),
	resourceLinks: z.array(navigationItemSchema),
	legalLinks: z.array(navigationItemSchema),
	socialLinks: z.array(socialLinkSchema),
});

const pageSectionSettingsSchema = z.object({
	theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
	spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
	container: z.enum(["site", "content", "none"]),
	layout: cardLayoutSchema.optional(),
	columns: cardColumnsSchema.optional(),
	gap: cardGapSchema.optional(),
	mediaRatio: mediaRatioSchema.optional(),
	separator: cardSeparatorSchema.optional(),
});

const pageActionSchema = z.object({
	href: z.string().min(1),
	label: z.string().min(1),
	icon: iconNameSchema.optional(),
	iconPosition: z.enum(["start", "end"]).optional(),
	variant: buttonVariantSchema.optional(),
	tone: buttonToneSchema.optional(),
	size: buttonSizeSchema.optional(),
});

const pageHeadingSchema = z.object({
	number: z.string().optional(),
	label: z.string().optional(),
	title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
	description: z.string().optional(),
	action: pageActionSchema.optional(),
});

const cardSlotsSchema = z.object({
	media: z.boolean().optional(),
	icon: z.boolean().optional(),
	metadata: z.boolean().optional(),
	tags: z.boolean().optional(),
	metrics: z.boolean().optional(),
	title: z.boolean().optional(),
	excerpt: z.boolean().optional(),
	action: z.boolean().optional(),
});

const pageCardConfigSchema = z.object({
	template: cardTemplateSchema.optional(),
	layout: cardLayoutSchema.optional(),
	columns: cardColumnsSchema.optional(),
	gap: cardGapSchema.optional(),
	mediaRatio: mediaRatioSchema.optional(),
	separator: cardSeparatorSchema.optional(),
	headingLevel: z.number().int().min(1).max(6).optional(),
	slots: cardSlotsSchema.optional(),
});

const optionSchema = z.object({ label: z.string().min(1), value: z.string().min(1) });
const searchControlSchema = z.object({
	id: z.string().min(1),
	label: z.string().min(1),
	name: z.string().min(1),
	placeholder: z.string().min(1),
});
const viewControlSchema = z.object({
	label: z.string().min(1),
	gridLabel: z.string().min(1),
	listLabel: z.string().min(1),
});
const paginationSchema = z.object({
	label: z.string().min(1),
	previousLabel: z.string().min(1),
	nextLabel: z.string().min(1),
	pageSize: z.number().int().positive(),
});
const filterGroupSchema = z.object({
	appearance: z.enum(["controls", "navigation"]),
	control: z.enum(["category", "license", "platform", "status", "technology"]),
	legend: z.string().min(1),
	name: z.string().min(1),
	type: z.enum(["radio", "checkbox"]),
});
const sectionHeaderPresentationSchema = z.object({
	appearance: z.enum(["default", "compact"]),
	headingLevel: z.number().int().min(1).max(6),
});

const projectCardPresentationSchema = z.object({
	routes: z.object({
		base: z.string().min(1),
		categoryBase: z.string().min(1),
		tagBase: z.string().min(1),
	}),
	actionLabel: z.string().optional(),
	actionIcon: iconNameSchema.optional(),
	separator: z.string(),
	size: cardItemSizeSchema.optional(),
	tagsLabel: z.string().optional(),
	lightAppearance: cardAppearanceSchema,
	darkAppearance: cardAppearanceSchema,
	metadataDisplay: metadataDisplaySchema,
	imageWidth: z.number().int().positive(),
	imageHeight: z.number().int().positive(),
});

const labCardPresentationSchema = z.object({
	routes: z.object({
		base: z.string().min(1),
		categoryBase: z.string().min(1),
		technologyBase: z.string().min(1),
	}),
	ariaLabelPrefix: z.string(),
	categoryDisplay: metadataDisplaySchema,
	completeBadgeTone: badgeToneSchema,
	activeBadgeTone: badgeToneSchema,
	tagsLabelSuffix: z.string(),
	metricIcons: z.tuple([iconNameSchema, iconNameSchema, iconNameSchema]),
});

const productCardPresentationSchema = z.object({
	routes: z.object({ base: z.string().min(1), categoryBase: z.string().min(1) }),
	ariaLabelPrefix: z.string(),
	imageAltSuffix: z.string(),
	imageWidth: z.number().int().positive(),
	imageHeight: z.number().int().positive(),
	categoryDisplay: metadataDisplaySchema,
	actionHref: z.string().min(1),
	actionLabelPrefix: z.string(),
	actionIcon: iconNameSchema,
	license: z.enum(["free", "pro"]),
});

const insightCardPresentationSchema = z.object({
	routes: z.object({
		base: z.string().min(1),
		categoryBase: z.string().min(1),
		tagBase: z.string().min(1),
	}),
	separator: z.string(),
	metadataDisplay: metadataDisplaySchema,
	tagsLabelSuffix: z.string(),
	imageWidth: z.number().int().positive(),
	imageHeight: z.number().int().positive(),
});

const publicationCardPresentationSchema = z.object({
	routes: z.object({ base: z.string().min(1), categoryBase: z.string().min(1) }),
	ariaLabelPrefix: z.string(),
	categoryDisplay: metadataDisplaySchema,
	tagsLabelSuffix: z.string(),
	viewsIcon: iconNameSchema,
});

const staticCardItemSchema = z.record(z.string(), z.unknown());
const collectionSectionBase = {
	id: z.string().min(1),
	type: z.literal("collection"),
	template: z.enum(["sidebar", "cards", "split"]).optional(),
	settings: pageSectionSettingsSchema,
};
const collectionContentBase = {
	heading: pageHeadingSchema.optional(),
	cards: pageCardConfigSchema.optional(),
};
const staticCollectionSectionSchema = z.object({
	...collectionSectionBase,
	content: z.object({
		...collectionContentBase,
		items: z.array(staticCardItemSchema).min(1),
	}),
});
const productsCollectionSectionSchema = z.object({
	...collectionSectionBase,
	content: z.object({
		...collectionContentBase,
		source: z.object({ collection: z.literal("products"), limit: z.number().int().positive().optional() }),
		itemPresentation: productCardPresentationSchema,
	}),
});
const projectsCollectionSectionSchema = z.object({
	...collectionSectionBase,
	content: z.object({
		...collectionContentBase,
		source: z.object({ collection: z.literal("projects"), limit: z.number().int().positive().optional() }),
		itemPresentation: projectCardPresentationSchema,
	}),
});
const labsCollectionSectionSchema = z.object({
	...collectionSectionBase,
	content: z.object({
		...collectionContentBase,
		source: z.object({ collection: z.literal("labs"), limit: z.number().int().positive().optional() }),
		itemPresentation: labCardPresentationSchema,
	}),
});
const blogCollectionSectionSchema = z.object({
	...collectionSectionBase,
	content: z.object({
		...collectionContentBase,
		source: z.object({ collection: z.literal("blog"), limit: z.number().int().positive().optional() }),
		itemPresentation: insightCardPresentationSchema,
	}),
});
const comicsCollectionSectionSchema = z.object({
	...collectionSectionBase,
	content: z.object({
		...collectionContentBase,
		source: z.object({ collection: z.literal("comics"), limit: z.number().int().positive().optional() }),
		itemPresentation: publicationCardPresentationSchema,
	}),
});
const novelsCollectionSectionSchema = z.object({
	...collectionSectionBase,
	content: z.object({
		...collectionContentBase,
		source: z.object({ collection: z.literal("novels"), limit: z.number().int().positive().optional() }),
		itemPresentation: publicationCardPresentationSchema,
	}),
});
const publicationsCollectionSectionSchema = z.object({
	...collectionSectionBase,
	content: z.object({
		...collectionContentBase,
		source: z.object({ collection: z.literal("publications"), limit: z.number().int().positive().optional() }),
		itemPresentation: z.object({
			comics: publicationCardPresentationSchema,
			novels: publicationCardPresentationSchema,
		}),
});

const projectsArchiveSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("archive"),
	template: z.literal("taxonomy"),
	settings: pageSectionSettingsSchema,
	content: z.object({
		source: z.object({ collection: z.literal("projects") }),
		routes: z.object({ base: z.string().min(1), categoryBase: z.string().min(1), tagBase: z.string().min(1) }),
		taxonomy: z.object({ categoryPrefix: z.string().min(1), tagPrefix: z.string().min(1) }),
		toolbar: z.object({
			filterLabel: z.string().min(1),
			allLabel: z.string().min(1),
			allValue: z.string().min(1),
			sortLabel: z.string().min(1),
			sortValue: z.string().min(1),
			sortOptions: z.array(optionSchema).min(1),
			viewLabel: z.string().min(1),
			gridViewLabel: z.string().min(1),
			listViewLabel: z.string().min(1),
		}),
		cards: z.object({
			grid: pageCardConfigSchema,
			list: pageCardConfigSchema,
		}),
		itemPresentation: projectCardPresentationSchema,
	}),
});

const productsArchiveSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("archive"),
	template: z.literal("sidebar"),
	settings: pageSectionSettingsSchema,
	content: z.object({
		source: z.object({ collection: z.literal("products") }),
		search: searchControlSchema,
		view: viewControlSchema,
		filters: z.array(filterGroupSchema).min(1),
		pagination: paginationSchema,
		cards: z.object({
			grid: pageCardConfigSchema,
			list: pageCardConfigSchema,
		}),
		itemPresentation: productCardPresentationSchema,
	}),
});

const labsArchiveSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("archive"),
	template: z.literal("sidebar"),
	settings: pageSectionSettingsSchema,
	content: z.object({
		source: z.object({ collection: z.literal("labs") }),
		search: searchControlSchema,
		view: viewControlSchema,
		filters: z.array(filterGroupSchema).min(1),
		pagination: paginationSchema,
		cards: z.object({
			grid: pageCardConfigSchema,
			list: pageCardConfigSchema,
		}),
		itemPresentation: labCardPresentationSchema,
	}),
});

const blogArchiveSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("archive"),
	template: z.literal("sidebar"),
	settings: pageSectionSettingsSchema,
	content: z.object({
		source: z.object({ collection: z.literal("blog") }),
		search: searchControlSchema,
		view: viewControlSchema,
		filters: z.array(filterGroupSchema).min(1),
		pagination: paginationSchema,
		cards: z.object({
			grid: pageCardConfigSchema,
			list: pageCardConfigSchema,
		}),
		itemPresentation: insightCardPresentationSchema,
	}),
});

const pageHeroContentSchema = z.object({
	template: z.enum(["simple", "split", "immersive", "chapter"]),
	eyebrow: z.string().optional(),
	title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
	description: z.string().optional(),
	media: imageSchema.optional(),
	metadata: z.array(z.string().min(1)).optional(),
	actions: z.array(pageActionSchema).optional(),
});

const heroSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("hero"),
	settings: pageSectionSettingsSchema,
	content: pageHeroContentSchema,
});

const contentSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("content"),
	template: z.enum(["prose", "feature", "split", "media", "metrics", "quote", "details", "chapters", "reader", "comments", "related"]),
	settings: pageSectionSettingsSchema,
	content: z.record(z.string(), z.unknown()),
});

const ctaSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("cta"),
	template: z.enum(["default", "newsletter"]),
	settings: pageSectionSettingsSchema,
	content: z.record(z.string(), z.unknown()),
});

const pageSectionSchema = z.discriminatedUnion("type", [
	heroSectionSchema,
	staticCollectionSectionSchema,
	productsCollectionSectionSchema,
	projectsCollectionSectionSchema,
	labsCollectionSectionSchema,
	blogCollectionSectionSchema,
	comicsCollectionSectionSchema,
	novelsCollectionSectionSchema,
	publicationsCollectionSectionSchema,
	projectsArchiveSectionSchema,
	productsArchiveSectionSchema,
	labsArchiveSectionSchema,
	blogArchiveSectionSchema,
	contentSectionSchema,
	ctaSectionSchema,
]);

export const pageDocumentSchema = z.object({
	page: z.object({
		slug: z.string().min(1),
		seo: z.object({
			title: z.string().min(1),
			description: z.string().min(1),
		}),
		sections: z.array(pageSectionSchema),
	}),
});

export const systemStatesSettingsSchema = z.object({
	states: z.array(systemStateSchema).min(1),
});
