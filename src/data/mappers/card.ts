import type { CCardData } from "@/types/components/object/component/card/CCard.types";
import type { Insight, Lab, Product, Project, PublicationEntry } from "@/types/content";

export interface CardRouteConfig {
	base: string;
	categoryBase?: string;
	tagBase?: string;
	technologyBase?: string;
}

export interface ProductCardPresentation {
	routes: CardRouteConfig;
	ariaLabelPrefix: string;
	imageAltSuffix: string;
	imageWidth: number;
	imageHeight: number;
	categoryDisplay: "text";
	actionHref: string;
	actionLabelPrefix: string;
	actionIcon: NonNullable<NonNullable<CCardData["action"]>["icon"]>;
	license: NonNullable<NonNullable<CCardData["product"]>["license"]>;
}

export interface LabCardPresentation {
	routes: CardRouteConfig;
	ariaLabelPrefix: string;
	categoryDisplay: "text";
	completeBadgeTone: NonNullable<NonNullable<CCardData["badge"]>["tone"]>;
	activeBadgeTone: NonNullable<NonNullable<CCardData["badge"]>["tone"]>;
	tagsLabelSuffix: string;
	metricIcons: [
		NonNullable<NonNullable<CCardData["metrics"]>[number]["icon"]>,
		NonNullable<NonNullable<CCardData["metrics"]>[number]["icon"]>,
		NonNullable<NonNullable<CCardData["metrics"]>[number]["icon"]>,
	];
}

export interface PublicationCardPresentation {
	routes: CardRouteConfig;
	ariaLabelPrefix: string;
	categoryDisplay: "text";
	tagsLabelSuffix: string;
	viewsIcon: NonNullable<NonNullable<CCardData["metrics"]>[number]["icon"]>;
}

export interface ProjectCardPresentation {
	routes: CardRouteConfig;
	actionLabel?: string;
	actionIcon?: NonNullable<NonNullable<CCardData["action"]>["icon"]>;
	separator?: string;
	size?: CCardData["size"];
	tagsLabel?: string;
	lightAppearance?: CCardData["appearance"];
	darkAppearance?: CCardData["appearance"];
	metadataDisplay?: "text";
	imageWidth: number;
	imageHeight: number;
}

export interface InsightCardPresentation {
	routes: CardRouteConfig;
	separator?: string;
	metadataDisplay?: "text";
	tagsLabelSuffix?: string;
	imageWidth: number;
	imageHeight: number;
}

export function mapProductToCard(product: Product, presentation: ProductCardPresentation): CCardData {
	return {
		href: `${presentation.routes.base}${product.slug}`,
		ariaLabel: `${presentation.ariaLabelPrefix}${product.title}`,
		title: [product.title],
		excerpt: product.description,
		media: {
			src: product.image,
			alt: `${product.title}${presentation.imageAltSuffix}`,
			width: presentation.imageWidth,
			height: presentation.imageHeight,
		},
		metadata: {
			items: [
				{
					type: "category",
					label: product.category,
					href: presentation.routes.categoryBase ? `${presentation.routes.categoryBase}${product.categorySlug}` : undefined,
					display: presentation.categoryDisplay,
				},
			],
		},
		action: {
			href: presentation.actionHref,
			label: `${presentation.actionLabelPrefix}${product.title}`,
			icon: presentation.actionIcon,
		},
		product: {
			badge: product.badge,
			category: product.category,
			categorySlug: product.categorySlug,
			license: presentation.license,
			oldPrice: product.oldPrice,
			platform: product.platform,
			price: product.price,
			rating: product.rating,
			reviews: product.reviews,
		},
	};
}

export function mapLabToCard(lab: Lab, presentation: LabCardPresentation): CCardData {
	return {
		href: lab.href,
		ariaLabel: `${presentation.ariaLabelPrefix}${lab.title}`,
		title: [lab.title],
		excerpt: lab.summary,
		media: lab.image,
		metadata: {
			items: [
				{
					type: "category",
					label: lab.category.label,
					href: presentation.routes.categoryBase ? `${presentation.routes.categoryBase}${lab.category.slug}` : undefined,
					display: presentation.categoryDisplay,
				},
			],
		},
		badge: {
			label: lab.statusLabel,
			tone: lab.status === "complete" ? presentation.completeBadgeTone : presentation.activeBadgeTone,
		},
		tags: lab.technologies.map((technology) => ({
			label: technology.label,
			href: presentation.routes.technologyBase ? `${presentation.routes.technologyBase}${technology.slug}` : undefined,
		})),
		tagsLabel: `${lab.title}${presentation.tagsLabelSuffix}`,
		metrics: [
			{ icon: presentation.metricIcons[0], label: String(lab.stars) },
			{ icon: presentation.metricIcons[1], label: String(lab.forks) },
			{ icon: presentation.metricIcons[2], label: lab.updatedLabel },
		],
		facets: {
			category: [lab.category.slug],
			status: [lab.status],
			technology: lab.technologies.map((technology) => technology.slug),
		},
		searchValue: [lab.title, lab.summary, lab.category.label, ...lab.technologies.map((technology) => technology.label)].join(" "),
	};
}

export function mapPublicationToCard(
	entry: PublicationEntry,
	_catalogSlug: "comics" | "novels",
	presentation: PublicationCardPresentation,
): CCardData {
	const href = `${presentation.routes.base}${entry.slug}`;
	return {
		href,
		ariaLabel: `${presentation.ariaLabelPrefix}${entry.title}`,
		title: [entry.title],
		excerpt: entry.summary,
		media: entry.cover,
		metadata: {
			items: entry.genres.map((genre) => ({
				type: "category" as const,
				label: genre.label,
				href: presentation.routes.categoryBase ? `${presentation.routes.categoryBase}${genre.slug}` : undefined,
				display: presentation.categoryDisplay,
			})),
		},
		tags: entry.genres.map((genre) => ({
			label: genre.label,
			href: presentation.routes.categoryBase ? `${presentation.routes.categoryBase}${genre.slug}` : undefined,
		})),
		tagsLabel: `${entry.title}${presentation.tagsLabelSuffix}`,
		metrics: [{ icon: presentation.viewsIcon, label: entry.views }],
		rating: { value: entry.rating },
		facets: {
			genre: entry.genres.map((genre) => genre.slug),
			status: [entry.status],
		},
		searchValue: [entry.title, entry.summary, entry.author, ...entry.genres.map((genre) => genre.label)].join(" "),
		sortValue: String(entry.order).padStart(4, "0"),
	};
}

export function mapProjectToCard(project: Project, presentation: ProjectCardPresentation): CCardData {
	return {
		href: project.href,
		ariaLabel: project.title,
		title: [project.title],
		excerpt: project.summary,
		filterValue: project.category,
		sortValue: project.year,
		size: presentation.size,
		supportingLabel: project.outcome,
		tags: project.tags.map((tag) => ({
			label: tag.label,
			href: presentation.routes.tagBase ? `${presentation.routes.tagBase}${tag.slug}` : undefined,
		})),
		tagsLabel: presentation.tagsLabel,
		appearance: project.tone === "dark" ? presentation.darkAppearance : presentation.lightAppearance,
		metadata: {
			separator: presentation.separator,
			items: [
				{ type: "index", label: project.number, display: presentation.metadataDisplay },
				{
					type: "category",
					label: project.category.toUpperCase(),
					href: presentation.routes.categoryBase ? `${presentation.routes.categoryBase}${project.categorySlug}` : undefined,
					display: presentation.metadataDisplay,
				},
				{
					type: "datetime",
					label: project.year,
					datetime: project.year,
					display: presentation.metadataDisplay,
				},
			],
		},
		action: presentation.actionLabel ? {
			label: presentation.actionLabel,
			href: project.href,
			icon: presentation.actionIcon,
		} : undefined,
		media: project.image ? {
			src: project.image,
			alt: project.alt || project.title,
			width: presentation.imageWidth,
			height: presentation.imageHeight,
		} : undefined,
	};
}

export function mapInsightToCard(insight: Insight, presentation: InsightCardPresentation): CCardData {
	return {
		href: insight.href,
		ariaLabel: insight.title,
		title: [insight.title],
		excerpt: insight.excerpt,
		metadata: {
			separator: presentation.separator,
			items: [
				{
					type: "category",
					label: insight.category,
					href: presentation.routes.categoryBase ? `${presentation.routes.categoryBase}${insight.categorySlug}` : undefined,
					display: presentation.metadataDisplay,
				},
				{ type: "reading-time", label: insight.readTime, display: presentation.metadataDisplay },
			],
		},
		secondaryMetadata: {
			separator: presentation.separator,
			items: [
				{ type: "author", label: insight.author, display: presentation.metadataDisplay },
				{
					type: "datetime",
					label: insight.publishedLabel,
					datetime: insight.publishedAt,
					display: presentation.metadataDisplay,
				},
			],
		},
		tags: insight.tags.map((tag) => ({
			label: tag.label,
			href: presentation.routes.tagBase ? `${presentation.routes.tagBase}${tag.slug}` : undefined,
		})),
		tagsLabel: presentation.tagsLabelSuffix ? `${insight.title}${presentation.tagsLabelSuffix}` : undefined,
		facets: {
			category: [insight.categorySlug],
			tag: insight.tags.map((tag) => tag.slug),
		},
		searchValue: [insight.title, insight.excerpt, insight.category, insight.author, ...insight.tags.map((tag) => tag.label)].join(" "),
		sortValue: insight.publishedAt,
		media: insight.image && insight.imageAlt ? {
			src: insight.image,
			alt: insight.imageAlt,
			width: presentation.imageWidth,
			height: presentation.imageHeight,
		} : undefined,
	};
}
