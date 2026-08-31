import { z } from "astro/zod";

const iconNameSchema = z.enum([
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
		itemPresentation: projectCardPresentationSchema,
		cards: pageCardConfigSchema,
		emptyLabel: z.string().min(1),
		pagination: paginationSchema,
	}),
});

const labsArchiveSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("archive"),
	template: z.literal("faceted"),
	settings: pageSectionSettingsSchema,
	content: z.object({
		source: z.object({ collection: z.literal("labs") }),
		toolbar: z.object({
			search: searchControlSchema,
			selects: z.array(z.object({
				control: z.enum(["status"]),
				id: z.string().min(1),
				label: z.string().min(1),
				value: z.string().min(1),
				options: z.array(optionSchema).min(1),
			})),
			sort: z.object({ label: z.string().min(1), value: z.string().min(1), options: z.array(optionSchema).min(1) }),
			view: viewControlSchema,
		}),
		sidebar: z.object({
			label: z.string().min(1),
			filterLabel: z.string().min(1),
			category: filterGroupSchema.extend({
				allLabel: z.string().min(1),
				allValue: z.string().min(1),
				allHref: z.string().min(1),
			}),
			technology: filterGroupSchema,
		}),
		routes: z.object({ categoryBase: z.string().min(1), technologyBase: z.string().min(1) }),
		itemPresentation: labCardPresentationSchema,
		resultLabel: z.string().min(1),
		cards: pageCardConfigSchema,
		emptyLabel: z.string().min(1),
		pagination: paginationSchema,
	}),
});

const productsArchiveSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("archive"),
	template: z.literal("faceted"),
	settings: pageSectionSettingsSchema,
	content: z.object({
		source: z.object({ collection: z.literal("products") }),
		routes: z.object({ base: z.string().min(1), categoryBase: z.string().min(1) }),
		toolbar: z.object({
			search: searchControlSchema,
			category: z.object({
				control: z.literal("category"),
				id: z.string().min(1),
				label: z.string().min(1),
				value: z.string().min(1),
				allLabel: z.string().min(1),
				allValue: z.string().min(1),
			}),
			platform: z.object({
				control: z.literal("platform"),
				id: z.string().min(1),
				label: z.string().min(1),
				value: z.string().min(1),
				allLabel: z.string().min(1),
				allValue: z.string().min(1),
				options: z.array(optionSchema).min(1),
			}),
			sort: z.object({ label: z.string().min(1), value: z.string().min(1), options: z.array(optionSchema).min(1) }),
			view: viewControlSchema,
		}),
		sidebar: z.object({
			label: z.string().min(1),
			filterLabel: z.string().min(1),
			category: filterGroupSchema,
			platform: filterGroupSchema,
			price: z.object({
				id: z.string().min(1),
				label: z.string().min(1),
				name: z.string().min(1),
				min: z.number(),
				max: z.number(),
				value: z.union([z.string(), z.number()]),
				prefix: z.string().optional(),
				maxSuffix: z.string().optional(),
			}),
			license: z.object({
				legend: z.string().min(1),
				freeLabel: z.string().min(1),
				proLabel: z.string().min(1),
			}),
			ratings: z.object({
				legend: z.string().min(1),
			}),
			advertisement: z.object({
				title: z.string().min(1),
				description: z.string().min(1),
				image: imageSchema,
				action: pageActionSchema,
			}),
		}),
		itemPresentation: productCardPresentationSchema,
		result: z.object({ label: z.string().min(1) }),
		cards: pageCardConfigSchema,
		emptyLabel: z.string().min(1),
		pagination: paginationSchema,
	}),
});

const blogArchiveSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("archive"),
	template: z.literal("faceted"),
	settings: pageSectionSettingsSchema,
	content: z.object({
		source: z.object({ collection: z.literal("blog") }),
		toolbar: z.object({
			search: searchControlSchema,
			category: z.object({
				control: z.literal("category"),
				id: z.string().min(1),
				label: z.string().min(1),
				allLabel: z.string().min(1),
				allValue: z.string().min(1),
			}),
			sort: z.object({ label: z.string().min(1), value: z.string().min(1), options: z.array(optionSchema).min(1) }),
			view: viewControlSchema,
		}),
		sidebar: z.object({
			label: z.string().min(1),
			filter: filterGroupSchema.extend({ allLabel: z.string().min(1) }),
			featured: z.object({
				title: z.string().min(1),
				limit: z.number().int().positive(),
				header: sectionHeaderPresentationSchema,
				cards: pageCardConfigSchema,
			}),
			newsletter: z.object({
				template: z.enum(["form-first", "media-first"]),
				title: z.string().min(1),
				description: z.string().min(1),
				image: imageSchema,
				action: pageActionSchema,
				form: z.object({
					formName: z.string().min(1),
					inputId: z.string().min(1),
					inputLabel: z.string().min(1),
					placeholder: z.string().min(1),
					submitLabel: z.string().min(1),
					tone: buttonToneSchema.optional(),
				}),
			}),
		}),
		itemPresentation: insightCardPresentationSchema,
		result: z.object({ title: z.string().min(1), header: sectionHeaderPresentationSchema.optional() }),
		cards: pageCardConfigSchema,
		emptyLabel: z.string().min(1),
		pagination: paginationSchema,
	}),
});

const heroSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("hero"),
	template: z.literal("split-media"),
	settings: pageSectionSettingsSchema,
	content: z.object({
		id: z.string().optional(),
		eyebrow: z.string().optional(),
		title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
		accent: z.string().optional(),
		description: z.string().optional(),
		image: imageSchema.optional(),
		actions: z.array(pageActionSchema).optional(),
		actionsLabel: z.string().optional(),
		socialLinks: z.array(socialLinkSchema).optional(),
		scrollLabel: z.string().optional(),
	}),
});

const pageHeaderSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("page-header"),
	template: z.enum(["split-media", "split-benefits", "immersive"]),
	settings: pageSectionSettingsSchema,
	content: z.object({
		id: z.string().optional(),
		title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]).optional(),
		description: z.string().optional(),
		eyebrow: z.string().optional(),
		accent: z.string().optional(),
		image: imageSchema.optional(),
		source: z.object({ collection: z.literal("blog") }).optional(),
		breadcrumb: z.object({
			label: z.string().min(1),
			items: z.array(navigationItemSchema),
			current: z.string().min(1),
		}).optional(),
		benefits: z.union([
			z.object({ items: z.array(z.object({ label: z.string().min(1), icon: iconNameSchema })).min(1) }),
			z.object({ articleLabel: z.string().min(1), topicLabel: z.string().min(1), minuteLabel: z.string().min(1) }),
		]).optional(),
		actionsLabel: z.string().optional(),
		actions: z.array(pageActionSchema).optional(),
		quote: z.string().optional(),
		quoteCredit: z.string().optional(),
		metrics: z.array(z.object({ label: z.string().min(1), value: z.string().min(1), icon: iconNameSchema })).optional(),
	}),
});

const articleSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("article"),
	template: z.literal("grouped").optional(),
	settings: pageSectionSettingsSchema,
	content: z.object({
		blocks: z.array(z.object({
			id: z.string().min(1),
			title: z.string().min(1),
			paragraphs: z.array(z.string().min(1)).min(1),
		})).min(1),
	}),
});

const ctaSectionSchema = z.object({
	id: z.string().min(1),
	type: z.literal("cta"),
	template: z.enum(["callout", "default", "media-pricing", "subscription"]),
	settings: pageSectionSettingsSchema,
	content: z.object({
		id: z.string().optional(),
		title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
		description: z.string().optional(),
		action: pageActionSchema.optional(),
		image: imageSchema.optional(),
		features: z.object({ items: z.array(z.object({ label: z.string().min(1), icon: iconNameSchema })).min(1) }).optional(),
		price: z.object({
			current: z.string().min(1),
			period: z.string().optional(),
			previous: z.string().optional(),
		}).optional(),
		form: z.object({
			formName: z.string().min(1),
			inputId: z.string().min(1),
			inputLabel: z.string().min(1),
			placeholder: z.string().min(1),
			submitLabel: z.string().min(1),
			tone: buttonToneSchema.optional(),
		}).optional(),
	}),
});

export const pageSectionSchema = z.union([
	staticCollectionSectionSchema,
	productsCollectionSectionSchema,
	projectsCollectionSectionSchema,
	labsCollectionSectionSchema,
	blogCollectionSectionSchema,
	comicsCollectionSectionSchema,
	novelsCollectionSectionSchema,
	publicationsCollectionSectionSchema,
	projectsArchiveSectionSchema,
	labsArchiveSectionSchema,
	productsArchiveSectionSchema,
	blogArchiveSectionSchema,
	heroSectionSchema,
	pageHeaderSectionSchema,
	articleSectionSchema,
	ctaSectionSchema,
]);

const pageLayoutSchema = z.object({
	template: z.enum(["home", "stacked", "lead-content", "lead-content-closing", "lead-content-navigation", "lead-navigation-content"]),
});

const detailSectionSettingsSchema = z.object({
	theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
	spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
	container: z.enum(["site", "content", "none"]),
});

const productActionSchema = z.object({
	label: z.string().min(1),
	href: z.string().min(1),
	icon: iconNameSchema,
	variant: z.enum(["primary", "outline"]),
});

const productDetailPageSchema = z.object({
	template: z.literal("lead-content"),
	sections: z.array(z.discriminatedUnion("type", [
		z.object({
			id: z.string().min(1),
			type: z.literal("page-header"),
			template: z.literal("gallery-summary"),
			settings: detailSectionSettingsSchema,
			content: z.object({
				breadcrumbLabel: z.string().min(1),
				productsLabel: z.string().min(1),
				galleryLabel: z.string().min(1),
				thumbnailLabel: z.string().min(1),
				salesLabel: z.string().min(1),
				features: z.array(z.object({ label: z.string().min(1), icon: iconNameSchema.optional() })),
				facts: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
				actionsLabel: z.string().min(1),
				actions: z.array(productActionSchema),
				paymentLabel: z.string().min(1),
				paymentMethods: z.array(imageSchema),
			}),
		}),
		z.object({
			id: z.string().min(1),
			type: z.literal("article"),
			template: z.literal("grouped").optional(),
			settings: detailSectionSettingsSchema,
			content: z.object({
				blocks: z.array(z.object({
					id: z.string().min(1),
					title: z.string().min(1),
					paragraphs: z.array(z.string().min(1)).min(1),
				})).min(1),
			}),
		}),
	])),
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
	seo: z.record(z.string(), z.unknown()).nullable().optional(),
	content: z.object({
		layout: pageLayoutSchema,
		sections: z.array(pageSectionSchema),
	}),
});

export const closingProfileSettingsSchema = z.object({
	id: z.string().min(1),
	eyebrow: z.string().min(1),
	nameLines: z.array(z.string().min(1)).min(1),
	roleLabel: z.string().min(1),
	followAction: z.object({ label: z.string().min(1), href: z.string().min(1) }),
	emailActionLabel: z.string().min(1),
	locationLabel: z.string().min(1),
	portraits: z.object({ collapsed: imageSchema, expanded: imageSchema }).optional(),
});

export const interfaceSettingsSchema = z.object({
	skipToContent: z.string().min(1),
	backToTop: z.string().min(1),
	openMenu: z.string().min(1),
	closeMenu: z.string().min(1),
	loadingScreen: z.object({
		label: z.string().min(1),
		status: z.string().min(1),
		tips: z.array(z.string().min(1)).min(1),
		holdOpen: z.boolean(),
		progressLabel: z.string().min(1),
		image: imageSchema,
	}),
	navigation: z.object({
		primaryLabel: z.string().min(1),
		mobileLabel: z.string().min(1),
		socialLabel: z.string().min(1),
		footerSocialLabel: z.string().min(1),
		railSocialDisplay: z.enum(["label", "shortLabel", "icon"]),
	}),
	progress: z.object({
		railLabel: z.string().min(1),
		readingLabel: z.string().min(1),
		initialSection: z.string().min(1),
		initialValue: z.string().min(1),
	}),
	separators: z.object({ slash: z.string(), dot: z.string() }),
	contentFormatting: z.object({
		readingTimeTemplate: z.string().includes("{minutes}"),
		dateLocale: z.string().min(2),
	}),
});

export const productEntrySchema = z.object({
	id: z.number().int().positive(),
	slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	title: z.string().min(1),
	category: z.string().min(1),
	categorySlug: z.string().min(1),
	platform: z.string().min(1),
	description: z.string().min(1),
	price: z.number().nonnegative(),
	oldPrice: z.number().nonnegative().optional(),
	rating: z.number().min(0).max(5),
	reviews: z.number().int().nonnegative(),
	badge: z.string().optional(),
	image: z.string().min(1),
	detail: z.object({ page: productDetailPageSchema }),
});

export const footerSettingsSchema = z.object({
	brandDescription: z.string().min(1),
	socialDisplay: z.enum(["label", "shortLabel", "icon"]),
	menuLabel: z.string().min(1),
	resourcesLabel: z.string().min(1),
	legalLabel: z.string().min(1),
	locationLabel: z.string().min(1),
	copyrightSymbol: z.string().min(1),
	buildLabel: z.string().min(1),
	newsletter: z.object({
		label: z.string().min(1),
		description: z.string().min(1),
		inputLabel: z.string().min(1),
		placeholder: z.string().min(1),
		submitLabel: z.string().min(1),
	}),
});

export const systemStatesSettingsSchema = z.object({
	notFound: systemStateSchema,
	empty: systemStateSchema,
});