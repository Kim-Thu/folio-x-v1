import type { PCardData } from "@/types/components/object/project/card/PCard.types";
import type { Insight, Lab, Product, Project, PublicationEntry } from "@/types/content";

export function mapProductToCard(product: Product): PCardData {
	return {
		href: `/products/${product.slug}`,
		ariaLabel: `View ${product.title}`,
		title: [product.title],
		excerpt: product.description,
		media: {
			src: product.image,
			alt: `${product.title} preview`,
			width: 900,
			height: 562,
		},
		metadata: {
			items: [
				{
					type: "category",
					label: product.category,
					href: `/products/category/${product.categorySlug}`,
					display: "text",
				},
			],
		},
		action: {
			href: "#products",
			label: `Add ${product.title} to cart`,
			icon: "shoppingBag",
		},
		product: {
			badge: product.badge,
			category: product.category,
			categorySlug: product.categorySlug,
			license: "pro",
			oldPrice: product.oldPrice,
			platform: product.platform,
			price: product.price,
			rating: product.rating,
			reviews: product.reviews,
		},
	};
}

export function mapLabToCard(lab: Lab): PCardData {
	return {
		href: lab.href,
		ariaLabel: `View ${lab.title}`,
		title: [lab.title],
		excerpt: lab.summary,
		media: lab.image,
		metadata: {
			items: [
				{
					type: "category",
					label: lab.category.label,
					href: `/labs/category/${lab.category.slug}`,
					display: "text",
				},
			],
		},
		badge: {
			label: lab.statusLabel,
			tone: lab.status === "complete" ? "neutral" : "brand",
		},
		tags: lab.technologies.map((technology) => ({
			label: technology.label,
			href: `/labs/technology/${technology.slug}`,
		})),
		tagsLabel: `${lab.title} technologies`,
		metrics: [
			{ icon: "star", label: String(lab.stars) },
			{ icon: "github", label: String(lab.forks) },
			{ icon: "clock01", label: lab.updatedLabel },
		],
		facets: {
			category: [lab.category.slug],
			status: [lab.status],
			technology: lab.technologies.map((technology) => technology.slug),
		},
		searchValue: [
			lab.title,
			lab.summary,
			lab.category.label,
			...lab.technologies.map((technology) => technology.label),
		].join(" "),
	};
}

export function mapPublicationToCard(
	entry: PublicationEntry,
	catalogSlug: "comics" | "novels",
): PCardData {
	const href = `/${catalogSlug}/${entry.slug}`;
	return {
		href,
		ariaLabel: `Read ${entry.title}`,
		title: [entry.title],
		excerpt: entry.summary,
		media: entry.cover,
		metadata: {
			items: entry.genres.map((genre) => ({
				type: "category" as const,
				label: genre.label,
				href: `/${catalogSlug}/category/${genre.slug}`,
				display: "text" as const,
			})),
		},
		tags: entry.genres.map((genre) => ({
			label: genre.label,
			href: `/${catalogSlug}/category/${genre.slug}`,
		})),
		tagsLabel: `${entry.title} genres`,
		metrics: [{ icon: "globeAlt", label: entry.views }],
		rating: { value: entry.rating },
		facets: {
			genre: entry.genres.map((genre) => genre.slug),
			status: [entry.status],
		},
		searchValue: [
			entry.title,
			entry.summary,
			entry.author,
			...entry.genres.map((genre) => genre.label),
		].join(" "),
		sortValue: String(entry.order).padStart(4, "0"),
	};
}

export function mapProjectToCard(
	project: Project,
	actionLabel: string,
	separator: string,
	size: PCardData["size"] = "standard",
	tagsLabel?: string,
): PCardData {
	return {
		href: project.href,
		ariaLabel: project.title,
		title: [project.title],
		excerpt: project.summary,
		filterValue: project.category,
		sortValue: project.year,
		size,
		supportingLabel: project.outcome,
		tags: project.tags.map((tag) => ({
			label: tag.label,
			href: `/projects/tag/${tag.slug}`,
		})),
		tagsLabel,
		appearance: project.tone === "dark" ? "inverse" : "default",
		metadata: {
			separator,
			items: [
				{ type: "index", label: project.number, display: "text" },
				{
					type: "category",
					label: project.category.toUpperCase(),
					href: `/projects/category/${project.categorySlug}`,
					display: "text",
				},
				{
					type: "datetime",
					label: project.year,
					datetime: project.year,
					display: "text",
				},
			],
		},
		action: {
			label: actionLabel,
			href: project.href,
			icon: "arrowUpRight",
		},
		media: project.image
			? {
					src: project.image,
					alt: project.alt || project.title,
					width: 800,
					height: 600,
				}
			: undefined,
	};
}

export function mapInsightToCard(
	insight: Insight,
	separator: string,
): PCardData {
	return {
		href: insight.href,
		ariaLabel: insight.title,
		title: [insight.title],
		excerpt: insight.excerpt,
		metadata: {
			separator,
			items: [
				{
					type: "category",
					label: insight.category,
					href: insight.categorySlug ? `/blog/category/${insight.categorySlug}` : undefined,
					display: "text",
				},
				{ type: "reading-time", label: insight.readTime, display: "text" },
			],
		},
		secondaryMetadata: {
			separator,
			items: [
				{ type: "author", label: insight.author, display: "text" },
				{
					type: "datetime",
					label: insight.publishedLabel,
					datetime: insight.publishedAt,
					display: "text",
				},
			],
		},
		tags: insight.tags.map((tag) => ({
			label: tag.label,
			href: `/blog/tag/${tag.slug}`,
		})),
		tagsLabel: `${insight.title} tags`,
		facets: {
			category: [insight.categorySlug],
			tag: insight.tags.map((tag) => tag.slug),
		},
		searchValue: [
			insight.title,
			insight.excerpt,
			insight.category,
			insight.author,
			...insight.tags.map((tag) => tag.label),
		].join(" "),
		sortValue: insight.publishedAt,
		media:
			insight.image && insight.imageAlt
				? {
						src: insight.image,
						alt: insight.imageAlt,
						width: 1536,
						height: 1536,
					}
				: undefined,
	};
}
