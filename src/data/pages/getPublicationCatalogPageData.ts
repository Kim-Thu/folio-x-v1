import { getPublicationCatalogs } from "@/data/cms";
import { mapPublicationToCard } from "@/data/mappers/card";
import { applyPageBuilderControl } from "@/data/mappers/page-builder";
import type { PCardData } from "@/types/components/object/project/card/PCard.types";
import type { CatalogPageData } from "@/types/components/pages/catalog/CatalogPage.types";
import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";
import type { PublicationCatalog } from "@/types/content";

type CatalogSlug = PublicationCatalog["slug"];

export async function getPublicationCatalogPageData(
	slug: CatalogSlug,
): Promise<CatalogPageData> {
	const catalogs = await getPublicationCatalogs();
	const catalog = catalogs.find((item) => item.slug === slug);
	if (!catalog) throw new Error(`Missing publication catalog: ${slug}`);

	const entries = catalog.entries.map((entry) =>
		mapPublicationToCard(entry, catalog.slug),
	);
	const genreCards: PCardData[] = catalog.genres.map((genre) => ({
		href: `/${catalog.slug}?genre=${genre.slug}#catalog`,
		ariaLabel: `Browse ${genre.label}`,
		title: [genre.label],
		excerpt: `${genre.count} works`,
		icon: genre.icon,
		action: {
			label: `Browse ${genre.label}`,
			href: `/${catalog.slug}?genre=${genre.slug}#catalog`,
			icon: "arrowRight",
			iconPosition: "end",
		},
	}));
	const authorCards: PCardData[] = catalog.authors.map((author) => ({
		href: `/${catalog.slug}?author=${encodeURIComponent(author.name)}#catalog`,
		ariaLabel: `Browse works by ${author.name}`,
		title: [author.name],
		excerpt: `${author.works} works`,
		media: author.image,
	}));
	const latestEntries = entries.slice(0, 6).map((entry, index) => ({
		...entry,
		excerpt: `Chapter ${catalog.entries[index].chapters} · ${catalog.entries[index].updatedLabel}`,
	}));
	const catalogActions = [
		{
			...catalog.primaryAction,
			icon: "arrowRight" as const,
			iconPosition: "end" as const,
			variant: "primary" as const,
			tone: "light" as const,
			size: "md" as const,
		},
		{
			...catalog.secondaryAction,
			icon: "archiveBox" as const,
			iconPosition: "end" as const,
			variant: "outline" as const,
			tone: "light" as const,
			size: "md" as const,
		},
	];
	const entrySlides = catalog.entries.slice(0, 4).map((entry) => {
		const words = entry.title.split(" ");
		const accent = words.pop() ?? entry.title;
		return {
			title: words.join(" "),
			accent: `${accent}.`,
			description: entry.summary,
			actions: [
				{
					label: catalog.slug === "novels" ? "Start reading" : "Read comic",
					href: `/${catalog.slug}/${entry.slug}`,
					icon: "arrowRight" as const,
					iconPosition: "end" as const,
					variant: "primary" as const,
					tone: "light" as const,
					size: "md" as const,
				},
				{
					label: "Browse all",
					href: `/${catalog.slug}#catalog`,
					icon: "archiveBox" as const,
					iconPosition: "end" as const,
					variant: "outline" as const,
					tone: "light" as const,
					size: "md" as const,
				},
			],
			image: entry.cover,
			quote: entry.title,
			quoteCredit: entry.author,
		};
	});
	const featuredSlides = [
		{
			title: catalog.title,
			accent: catalog.accent,
			description: catalog.description,
			actions: catalogActions,
			image: catalog.hero,
			quote: catalog.quote,
			quoteCredit: catalog.quoteCredit,
		},
		...entrySlides,
	];

	const defaultBuilder: PageBuilderConfig = {
		layout: { template: "fluid" },
		regions: [
			{
				key: "lead",
				component: "page-header",
				placement: "header",
				section: {
					id: `${catalog.slug}-hero`,
					theme: "canvas",
					spacing: "none",
					container: "none",
				},
				props: {
					template: "immersive",
					data: {
						id: `${catalog.slug}-hero`,
						eyebrow: catalog.label,
						title: catalog.title,
						accent: catalog.accent,
						description: catalog.description,
						actionsLabel: `${catalog.label} actions`,
						actions: catalogActions,
						image: catalog.hero,
						quote: catalog.quote,
						quoteCredit: catalog.quoteCredit,
						metrics: catalog.stats.map((stat) => ({
							label: stat.label,
							value: stat.value,
							icon: stat.icon,
						})),
						slides: featuredSlides,
					},
				},
			},
			{
				key: "catalog",
				component: "group",
				placement: "main",
				section: {
					id: "catalog",
					theme: "canvas",
					spacing: "body",
					container: "site",
				},
				props: {
					template: "sidebar",
					asideLabel: `${catalog.label} discovery`,
					asidePosition: "end",
					panel: false,
					toolbar: {
						data: {
							search: {
								id: `${catalog.slug}-search`,
								label: `Search ${catalog.label.toLowerCase()}`,
								name: "query",
								placeholder: "Search title or author...",
							},
							selects: [
								{
									control: "genre",
									id: `${catalog.slug}-genre`,
									label: "Genre",
									value: "all",
									options: [
										{ label: "All genres", value: "all" },
										...catalog.genres.map((genre) => ({
											label: genre.label,
											value: genre.slug,
										})),
									],
								},
								{
									control: "status",
									id: `${catalog.slug}-status`,
									label: "Status",
									value: "all",
									options: [
										{ label: "All statuses", value: "all" },
										{ label: "Ongoing", value: "ongoing" },
										{ label: "Complete", value: "complete" },
									],
								},
							],
							sort: {
								label: "Sort",
								value: "newest",
								options: [
									{ label: "Newest", value: "newest" },
									{ label: "Oldest", value: "oldest" },
								],
							},
							view: {
								label: "View",
								gridLabel: "Grid view",
								listLabel: "List view",
							},
						},
					},
					regions: [
						{
							key: "featured",
							component: "cards",
							section: false,
							props: {
								header: {
									appearance: "compact",
									data: { id: "featured", title: "Featured" },
								},
								cards: {
									template: "media-metrics",
									columns: 5,
									gap: "sm",
									mediaRatio: "portrait",
									items: entries.slice(0, 5).map((entry, index) => ({
										...entry,
										badge: { label: String(index + 1), tone: "brand" },
									})),
									slots: { excerpt: false, tags: false, action: false },
								},
							},
						},
						{
							key: "latest",
							component: "cards",
							section: false,
							props: {
								header: {
									appearance: "compact",
									data: { id: "latest", title: "Latest updates" },
								},
								headerAction: {
									label: "View all",
									href: `/${catalog.slug}#catalog`,
									icon: "arrowRight",
									iconPosition: "end",
								},
								cards: {
									template: "compact-bordered",
									columns: 3,
									gap: "md",
									mediaRatio: "portrait",
									items: latestEntries,
									slots: { metadata: false, tags: false, action: false },
								},
							},
						},
						{
							key: "popular-genres",
							component: "cards",
							section: false,
							props: {
								header: {
									appearance: "compact",
									data: { title: "Popular genres" },
								},
								cards: {
									template: "icon-panel",
									columns: 4,
									gap: "sm",
									items: genreCards,
									slots: { media: false, metadata: false, tags: false, metrics: false },
								},
							},
						},
						{
							key: "genre-directory",
							component: "cards",
							placement: "aside",
							section: false,
							props: {
								header: { appearance: "compact", data: { title: "Genres" } },
								cards: {
									template: "icon-summary",
									layout: "list",
									gap: "sm",
									items: genreCards,
									slots: { media: false, metadata: false, tags: false, metrics: false, action: false },
								},
							},
						},
						{
							key: "trending",
							component: "cards",
							placement: "aside",
							section: false,
							props: {
								header: { appearance: "compact", data: { title: "Trending" } },
								cards: {
									template: "compact-media",
									layout: "list",
									gap: "sm",
									mediaRatio: "portrait",
									items: entries.slice(0, 5).map((entry, index) => ({
										...entry,
										excerpt: `#${index + 1} · Chapter ${catalog.entries[index].chapters}`,
										facets: undefined,
									})),
									slots: { metadata: false, tags: false, action: false },
								},
							},
						},
						{
							key: "authors",
							component: "cards",
							placement: "aside",
							section: false,
							props: {
								header: { appearance: "compact", data: { title: "Featured authors" } },
								cards: {
									template: "compact-media",
									layout: "list",
									gap: "sm",
									mediaRatio: "square",
									items: authorCards,
									slots: { metadata: false, tags: false, metrics: false, action: false },
								},
							},
						},
					],
				},
			},
			{
				key: "newsletter",
				component: "cta",
				placement: "cta",
				section: {
					id: `${catalog.slug}-newsletter`,
					theme: "canvas",
					spacing: "closing",
					container: "site",
				},
				props: {
					template: "subscription",
					data: {
						id: `${catalog.slug}-newsletter`,
						title: catalog.newsletter.title,
						description: catalog.newsletter.description,
						image: catalog.newsletter.image,
						form: {
							formName: `${catalog.slug}-updates`,
							inputId: `${catalog.slug}-email`,
							inputLabel: catalog.newsletter.inputLabel,
							placeholder: catalog.newsletter.placeholder,
							submitLabel: catalog.newsletter.submitLabel,
						},
					},
				},
			},
		],
	};

	return {
		metadata: { title: catalog.label, description: catalog.description },
		builder: applyPageBuilderControl(defaultBuilder, catalog.builder),
	};
}
