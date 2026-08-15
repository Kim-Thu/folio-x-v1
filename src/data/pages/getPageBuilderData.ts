import {
	getInsights,
	getLabs,
	getProductCategories,
	getProducts,
	getProjects,
	getPublicationCatalogSettings,
	getPublications,
} from "@/data/cms";
import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { PAdvertisementData } from "@/types/components/object/project/advertisement/PAdvertisement.types";
import type { PCtaProps } from "@/types/components/object/project/cta/PCta.types";
import type { PHeroProps } from "@/types/components/object/project/hero/PHero.types";
import type { PPageHeaderProps } from "@/types/components/object/project/page-header/PPageHeader.types";
import type { PCardData, PCardProps } from "@/types/components/object/project/card/PCard.types";
import type { PFilterChoiceGroupData } from "@/types/components/object/project/filter-panel/PFilterPanel.types";
import type { PSectionHeaderProps } from "@/types/components/object/project/section-header/PSectionHeader.types";
import type {
	PageBuilderContext,
	PageEntryData,
	PageSectionData,
	ResolvedPageData,
} from "@/types/components/pages/builder/PageBuilder.types";
import type { PageArchiveRegion } from "@/types/components/pages/builder/PageArchiveRegion.types";
import type { PageCollectionRegion } from "@/types/components/pages/builder/PageCollectionRegion.types";
import type { PageRegion } from "@/types/components/pages/builder/PageRegion.types";

type CollectionSection = Extract<PageSectionData, { type: "collection" }>;
type CollectionContent = CollectionSection["content"];
type SourcedCollectionContent = Extract<CollectionContent, { source: unknown }>;
type ProductsCollectionContent = Extract<SourcedCollectionContent, { source: { collection: "products" } }>;
type ProjectsCollectionContent = Extract<SourcedCollectionContent, { source: { collection: "projects" } }>;
type LabsCollectionContent = Extract<SourcedCollectionContent, { source: { collection: "labs" } }>;
type BlogCollectionContent = Extract<SourcedCollectionContent, { source: { collection: "blog" } }>;
type ComicsCollectionContent = Extract<SourcedCollectionContent, { source: { collection: "comics" } }>;
type NovelsCollectionContent = Extract<SourcedCollectionContent, { source: { collection: "novels" } }>;
type PublicationsCollectionContent = Extract<SourcedCollectionContent, { source: { collection: "publications" } }>;

type HeroSection = Extract<PageSectionData, { type: "hero" }>;
type PageHeaderSection = Extract<PageSectionData, { type: "page-header" }>;
type CtaSection = Extract<PageSectionData, { type: "cta" }>;

type ArchiveSection = Extract<PageSectionData, { type: "archive" }>;
type ProjectsArchiveSection = Extract<ArchiveSection, { content: { source: { collection: "projects" } } }>;
type LabsArchiveSection = Extract<ArchiveSection, { content: { source: { collection: "labs" } } }>;
type ProductsArchiveSection = Extract<ArchiveSection, { content: { source: { collection: "products" } } }>;
type BlogArchiveSection = Extract<ArchiveSection, { content: { source: { collection: "blog" } } }>;

const sectionFrame = (section: PageSectionData) => ({
	id: section.id,
	theme: section.settings.theme,
	spacing: section.settings.spacing,
	container: section.settings.container,
});

const sectionHeader = (section: CollectionSection): PSectionHeaderProps | undefined => {
	const heading = section.content.heading;
	if (!heading) return undefined;

	return {
		data: {
			number: heading.number,
			label: heading.label,
			title: heading.title,
			description: heading.description,
		},
		action: heading.action,
	};
};

const cardColumns = (value: number | undefined): PCardProps["columns"] => {
	switch (value) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			return value;
		default:
			return undefined;
	}
};

const headingLevel = (value: number | undefined): PCardProps["headingLevel"] => {
	switch (value) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			return value;
		default:
			return undefined;
	}
};

const cardConfig = (section: CollectionSection, items: PCardData[]): PCardProps => {
	const cards = section.content.cards;
	return {
		template: cards?.template,
		layout: cards?.layout ?? section.settings.layout,
		columns: cardColumns(cards?.columns ?? section.settings.columns),
		gap: cards?.gap ?? section.settings.gap,
		mediaRatio: cards?.mediaRatio ?? section.settings.mediaRatio,
		separator: cards?.separator ?? section.settings.separator,
		headingLevel: headingLevel(cards?.headingLevel),
		slots: cards?.slots,
		items,
	};
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null && !Array.isArray(value);

const isPCardData = (value: unknown): value is PCardData => {
	if (!isRecord(value)) return false;
	return (
		typeof value.href === "string" &&
		typeof value.ariaLabel === "string" &&
		Array.isArray(value.title) &&
		value.title.every((item) => typeof item === "string")
	);
};

const staticCardItems = (items: unknown[]): PCardData[] =>
	items.map((item) => {
		if (!isPCardData(item)) {
			throw new Error("Invalid static card data in page collection.");
		}
		return item;
	});

const take = <T>(items: T[], limit?: number) =>
	limit === undefined ? items : items.slice(0, limit);

const isProductsCollectionContent = (content: SourcedCollectionContent): content is ProductsCollectionContent =>
	content.source.collection === "products";
const isProjectsCollectionContent = (content: SourcedCollectionContent): content is ProjectsCollectionContent =>
	content.source.collection === "projects";
const isLabsCollectionContent = (content: SourcedCollectionContent): content is LabsCollectionContent =>
	content.source.collection === "labs";
const isBlogCollectionContent = (content: SourcedCollectionContent): content is BlogCollectionContent =>
	content.source.collection === "blog";
const isComicsCollectionContent = (content: SourcedCollectionContent): content is ComicsCollectionContent =>
	content.source.collection === "comics";
const isNovelsCollectionContent = (content: SourcedCollectionContent): content is NovelsCollectionContent =>
	content.source.collection === "novels";
const isPublicationsCollectionContent = (content: SourcedCollectionContent): content is PublicationsCollectionContent =>
	content.source.collection === "publications";

const resolveCollectionItems = async (section: CollectionSection): Promise<PCardData[]> => {
	const content = section.content;
	if ("items" in content) return staticCardItems(content.items);
	if (!("source" in content)) return [];

	if (isProductsCollectionContent(content)) {
		return take(await getProducts(), content.source.limit).map((item): PCardData => ({
			href: `${content.itemPresentation.routes.base}${item.slug}`,
			ariaLabel: `${content.itemPresentation.ariaLabelPrefix}${item.title}`,
			title: [item.title],
			excerpt: item.description,
			media: {
				src: item.image,
				alt: `${item.title}${content.itemPresentation.imageAltSuffix}`,
				width: content.itemPresentation.imageWidth,
				height: content.itemPresentation.imageHeight,
			},
			metadata: {
				items: [{
					type: "category",
					label: item.category,
					href: `${content.itemPresentation.routes.categoryBase}${item.categorySlug}`,
					display: content.itemPresentation.categoryDisplay,
				}],
			},
			action: {
				href: content.itemPresentation.actionHref,
				label: `${content.itemPresentation.actionLabelPrefix}${item.title}`,
				icon: content.itemPresentation.actionIcon,
			},
			product: {
				badge: item.badge,
				category: item.category,
				categorySlug: item.categorySlug,
				license: content.itemPresentation.license,
				oldPrice: item.oldPrice,
				platform: item.platform,
				price: item.price,
				rating: item.rating,
				reviews: item.reviews,
			},
		}));
	}
	if (isProjectsCollectionContent(content)) {
		return take(await getProjects(), content.source.limit).map((item): PCardData => ({
			href: item.href,
			ariaLabel: item.title,
			title: [item.title],
			excerpt: item.summary,
			filterValue: item.categorySlug,
			sortValue: item.year,
			size: content.itemPresentation.size,
			supportingLabel: item.outcome,
			tags: item.tags.map((tag) => ({
				label: tag.label,
				href: `${content.itemPresentation.routes.tagBase}${tag.slug}`,
			})),
			tagsLabel: content.itemPresentation.tagsLabel,
			appearance: item.tone === "dark"
				? content.itemPresentation.darkAppearance
				: content.itemPresentation.lightAppearance,
			metadata: {
				separator: content.itemPresentation.separator,
				items: [
					{ type: "index", label: item.number, display: content.itemPresentation.metadataDisplay },
					{
						type: "category",
						label: item.category.toUpperCase(),
						href: `${content.itemPresentation.routes.categoryBase}${item.categorySlug}`,
						display: content.itemPresentation.metadataDisplay,
					},
					{
						type: "datetime",
						label: item.year,
						datetime: item.year,
						display: content.itemPresentation.metadataDisplay,
					},
				],
			},
			action: content.itemPresentation.actionLabel ? {
				label: content.itemPresentation.actionLabel,
				href: item.href,
				icon: content.itemPresentation.actionIcon,
			} : undefined,
			media: item.image ? {
				src: item.image,
				alt: item.alt || item.title,
				width: content.itemPresentation.imageWidth,
				height: content.itemPresentation.imageHeight,
			} : undefined,
		}));
	}
	if (isLabsCollectionContent(content)) {
		return take(await getLabs(), content.source.limit).map((item): PCardData => ({
			href: item.href,
			ariaLabel: `${content.itemPresentation.ariaLabelPrefix}${item.title}`,
			title: [item.title],
			excerpt: item.summary,
			media: item.image,
			metadata: {
				items: [{
					type: "category",
					label: item.category.label,
					href: `${content.itemPresentation.routes.categoryBase}${item.category.slug}`,
					display: content.itemPresentation.categoryDisplay,
				}],
			},
			badge: {
				label: item.statusLabel,
				tone: item.status === "complete"
					? content.itemPresentation.completeBadgeTone
					: content.itemPresentation.activeBadgeTone,
			},
			tags: item.technologies.map((technology) => ({
				label: technology.label,
				href: `${content.itemPresentation.routes.technologyBase}${technology.slug}`,
			})),
			tagsLabel: `${item.title}${content.itemPresentation.tagsLabelSuffix}`,
			metrics: [
				{ icon: content.itemPresentation.metricIcons[0], label: String(item.stars) },
				{ icon: content.itemPresentation.metricIcons[1], label: String(item.forks) },
				{ icon: content.itemPresentation.metricIcons[2], label: item.updatedLabel },
			],
			facets: {
				category: [item.category.slug],
				status: [item.status],
				technology: item.technologies.map((technology) => technology.slug),
			},
			searchValue: [item.title, item.summary, item.category.label, ...item.technologies.map((technology) => technology.label)].join(" "),
		}));
	}
	if (isBlogCollectionContent(content)) {
		return take(await getInsights(), content.source.limit).map((item): PCardData => ({
			href: item.href,
			ariaLabel: item.title,
			title: [item.title],
			excerpt: item.excerpt,
			metadata: {
				separator: content.itemPresentation.separator,
				items: [
					{
						type: "category",
						label: item.category,
						href: `${content.itemPresentation.routes.categoryBase}${item.categorySlug}`,
						display: content.itemPresentation.metadataDisplay,
					},
					{ type: "reading-time", label: item.readTime, display: content.itemPresentation.metadataDisplay },
				],
			},
			secondaryMetadata: {
				separator: content.itemPresentation.separator,
				items: [
					{ type: "author", label: item.author, display: content.itemPresentation.metadataDisplay },
					{
						type: "datetime",
						label: item.publishedLabel,
						datetime: item.publishedAt,
						display: content.itemPresentation.metadataDisplay,
					},
				],
			},
			tags: item.tags.map((tag) => ({
				label: tag.label,
				href: `${content.itemPresentation.routes.tagBase}${tag.slug}`,
			})),
			tagsLabel: content.itemPresentation.tagsLabelSuffix
				? `${item.title}${content.itemPresentation.tagsLabelSuffix}`
				: undefined,
			facets: {
				category: [item.categorySlug],
				tag: item.tags.map((tag) => tag.slug),
			},
			searchValue: [item.title, item.excerpt, item.category, item.author, ...item.tags.map((tag) => tag.label)].join(" "),
			sortValue: item.publishedAt,
			media: item.image && item.imageAlt ? {
				src: item.image,
				alt: item.imageAlt,
				width: content.itemPresentation.imageWidth,
				height: content.itemPresentation.imageHeight,
			} : undefined,
		}));
	}
	if (isComicsCollectionContent(content)) {
		return take(await getPublications("comics"), content.source.limit).map((item): PCardData => ({
			href: `${content.itemPresentation.routes.base}${item.slug}`,
			ariaLabel: `${content.itemPresentation.ariaLabelPrefix}${item.title}`,
			title: [item.title],
			excerpt: item.summary,
			media: item.cover,
			metadata: { items: item.genres.map((genre) => ({
				type: "category",
				label: genre.label,
				href: `${content.itemPresentation.routes.categoryBase}${genre.slug}`,
				display: content.itemPresentation.categoryDisplay,
			})) },
			tags: item.genres.map((genre) => ({
				label: genre.label,
				href: `${content.itemPresentation.routes.categoryBase}${genre.slug}`,
			})),
			tagsLabel: `${item.title}${content.itemPresentation.tagsLabelSuffix}`,
			metrics: [{ icon: content.itemPresentation.viewsIcon, label: item.views }],
			rating: { value: item.rating },
			facets: { genre: item.genres.map((genre) => genre.slug), status: [item.status] },
			searchValue: [item.title, item.summary, item.author, ...item.genres.map((genre) => genre.label)].join(" "),
			sortValue: String(item.order).padStart(4, "0"),
		}));
	}
	if (isNovelsCollectionContent(content)) {
		return take(await getPublications("novels"), content.source.limit).map((item): PCardData => ({
			href: `${content.itemPresentation.routes.base}${item.slug}`,
			ariaLabel: `${content.itemPresentation.ariaLabelPrefix}${item.title}`,
			title: [item.title],
			excerpt: item.summary,
			media: item.cover,
			metadata: { items: item.genres.map((genre) => ({
				type: "category",
				label: genre.label,
				href: `${content.itemPresentation.routes.categoryBase}${genre.slug}`,
				display: content.itemPresentation.categoryDisplay,
			})) },
			tags: item.genres.map((genre) => ({
				label: genre.label,
				href: `${content.itemPresentation.routes.categoryBase}${genre.slug}`,
			})),
			tagsLabel: `${item.title}${content.itemPresentation.tagsLabelSuffix}`,
			metrics: [{ icon: content.itemPresentation.viewsIcon, label: item.views }],
			rating: { value: item.rating },
			facets: { genre: item.genres.map((genre) => genre.slug), status: [item.status] },
			searchValue: [item.title, item.summary, item.author, ...item.genres.map((genre) => genre.label)].join(" "),
			sortValue: String(item.order).padStart(4, "0"),
		}));
	}
	if (isPublicationsCollectionContent(content)) {
		const [novels, comics] = await Promise.all([
			getPublications("novels"),
			getPublications("comics"),
		]);
		return take([
			...novels.map((item): PCardData => {
				const presentation = content.itemPresentation.novels;
				return {
					href: `${presentation.routes.base}${item.slug}`,
					ariaLabel: `${presentation.ariaLabelPrefix}${item.title}`,
					title: [item.title], excerpt: item.summary, media: item.cover,
					metadata: { items: item.genres.map((genre) => ({ type: "category", label: genre.label, href: `${presentation.routes.categoryBase}${genre.slug}`, display: presentation.categoryDisplay })) },
					tags: item.genres.map((genre) => ({ label: genre.label, href: `${presentation.routes.categoryBase}${genre.slug}` })),
					tagsLabel: `${item.title}${presentation.tagsLabelSuffix}`,
					metrics: [{ icon: presentation.viewsIcon, label: item.views }], rating: { value: item.rating },
					facets: { genre: item.genres.map((genre) => genre.slug), status: [item.status] },
					searchValue: [item.title, item.summary, item.author, ...item.genres.map((genre) => genre.label)].join(" "),
					sortValue: String(item.order).padStart(4, "0"),
				};
			}),
			...comics.map((item): PCardData => {
				const presentation = content.itemPresentation.comics;
				return {
					href: `${presentation.routes.base}${item.slug}`,
					ariaLabel: `${presentation.ariaLabelPrefix}${item.title}`,
					title: [item.title], excerpt: item.summary, media: item.cover,
					metadata: { items: item.genres.map((genre) => ({ type: "category", label: genre.label, href: `${presentation.routes.categoryBase}${genre.slug}`, display: presentation.categoryDisplay })) },
					tags: item.genres.map((genre) => ({ label: genre.label, href: `${presentation.routes.categoryBase}${genre.slug}` })),
					tagsLabel: `${item.title}${presentation.tagsLabelSuffix}`,
					metrics: [{ icon: presentation.viewsIcon, label: item.views }], rating: { value: item.rating },
					facets: { genre: item.genres.map((genre) => genre.slug), status: [item.status] },
					searchValue: [item.title, item.summary, item.author, ...item.genres.map((genre) => genre.label)].join(" "),
					sortValue: String(item.order).padStart(4, "0"),
				};
			}),
		], content.source.limit);
	}

	return [];
};


type PublicationCatalogSettings = Awaited<ReturnType<typeof getPublicationCatalogSettings>>;

const publicationCatalogCardProps = (
	config: PublicationCatalogSettings["main"]["featuredCards"],
	items: PCardData[],
): PCardProps => ({
	template: config.template as PCardProps["template"],
	layout: config.layout as PCardProps["layout"],
	columns: cardColumns(config.columns),
	gap: config.gap as PCardProps["gap"],
	mediaRatio: config.mediaRatio as PCardProps["mediaRatio"],
	slots: config.slots,
	items,
});

const resolvePublicationCatalogCollection = async (
	section: CollectionSection,
): Promise<PageCollectionRegion> => {
	const content = section.content;
	if (!("source" in content) || !(
		isComicsCollectionContent(content) || isNovelsCollectionContent(content)
	)) {
		throw new Error(`Invalid publication catalog collection "${section.id}".`);
	}

	const catalog = content.source.collection;
	const [allEntries, settings] = await Promise.all([
		getPublications(catalog),
		getPublicationCatalogSettings(),
	]);
	const entries = take(allEntries, content.source.limit);
	const presentation = content.itemPresentation;
	const cards: PCardData[] = entries.map((entry) => ({
		href: `${presentation.routes.base}${entry.slug}`,
		ariaLabel: `${presentation.ariaLabelPrefix}${entry.title}`,
		title: [entry.title],
		excerpt: entry.summary,
		media: entry.cover,
		metadata: {
			items: entry.genres.map((genre) => ({
				type: "category",
				label: genre.label,
				href: `${presentation.routes.categoryBase}${genre.slug}`,
				display: presentation.categoryDisplay,
			})),
		},
		tags: entry.genres.map((genre) => ({
			label: genre.label,
			href: `${presentation.routes.categoryBase}${genre.slug}`,
		})),
		tagsLabel: `${entry.title}${presentation.tagsLabelSuffix}`,
		metrics: [{ icon: presentation.viewsIcon, label: entry.views }],
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
	}));

	const genreMap = new Map<string, { label: string; slug: string; count: number }>();
	for (const entry of entries) {
		for (const genre of entry.genres) {
			const current = genreMap.get(genre.slug);
			genreMap.set(genre.slug, {
				label: genre.label,
				slug: genre.slug,
				count: (current?.count ?? 0) + 1,
			});
		}
	}
	const genres = [...genreMap.values()].sort((first, second) => second.count - first.count);
	const genreIcons = settings.main.genreIcons as CIconName[];
	const popularGenreCards: PCardData[] = genres
		.slice(0, settings.main.popularGenresLimit)
		.map((genre, index) => ({
			href: `${presentation.routes.categoryBase}${genre.slug}`,
			ariaLabel: genre.label,
			title: [genre.label],
			excerpt: settings.main.genreWorksTemplate.replace("{count}", String(genre.count)),
			icon: genreIcons[index % genreIcons.length],
		}));

	const panel = {
		surface: settings.sidebar.panel.surface as "glass",
		radius: settings.sidebar.panel.radius as "md",
		spacing: settings.sidebar.panel.spacing as "sm",
	};
	const compactHeader = (title: string) => ({
		data: { title },
		appearance: "compact" as const,
		headingLevel: 2 as const,
	});

	return {
		key: section.id,
		component: "collection",
		section: sectionFrame(section),
		props: {
			template: "sidebar",
			header: sectionHeader(section),
			toolbar: {
				data: {
					search: {
						id: `${catalog}-search`,
						label: settings.toolbar.searchLabel,
						name: "search",
						placeholder: settings.toolbar.searchPlaceholder,
					},
					selects: [
						{
							control: "genre",
							id: `${catalog}-genre`,
							label: settings.toolbar.genreLabel,
							value: "all",
							options: [
								{ label: settings.toolbar.allGenresLabel, value: "all" },
								...genres.map((genre) => ({ label: genre.label, value: genre.slug })),
							],
						},
						{
							control: "status",
							id: `${catalog}-status`,
							label: settings.toolbar.statusLabel,
							value: "all",
							options: [
								{ label: settings.toolbar.allStatusesLabel, value: "all" },
								{ label: settings.toolbar.ongoingLabel, value: "ongoing" },
								{ label: settings.toolbar.completeLabel, value: "complete" },
							],
						},
					],
					sort: {
						label: settings.toolbar.sortLabel,
						value: settings.toolbar.sortValue,
						options: settings.toolbar.sortOptions,
					},
					view: {
						label: settings.toolbar.viewLabel,
						gridLabel: settings.toolbar.gridViewLabel,
						listLabel: settings.toolbar.listViewLabel,
					},
				},
			},
			sidebar: {
				layout: {
					label: settings.sidebar.labelTemplate.replace("{catalog}", catalog),
					position: settings.sidebar.position,
					sticky: settings.sidebar.sticky,
				},
				panel,
				filter: {
					data: {
						groups: [{
							appearance: "controls",
							control: "genre",
							legend: settings.sidebar.genresLegend,
							name: `${catalog}-genres`,
							type: "radio",
							options: [
								{
									label: settings.sidebar.allGenresShortLabel,
									value: "all",
									count: entries.length,
									checked: true,
								},
								...genres.map((genre) => ({
									label: genre.label,
									value: genre.slug,
									count: genre.count,
								})),
							],
						}],
					},
				},
				cardGroups: [{
					header: compactHeader(settings.sidebar.trendingTitle),
					cards: publicationCatalogCardProps(
						settings.sidebar.listCards,
						cards.slice(0, settings.sidebar.trendingLimit),
					),
				}],
			},
			cardGroups: [
				{
					header: compactHeader(settings.main.featuredTitle),
					cards: publicationCatalogCardProps(
						settings.main.featuredCards,
						cards.slice(0, settings.main.featuredLimit),
					),
				},
				{
					header: compactHeader(settings.main.latestTitle),
					cards: publicationCatalogCardProps(
						settings.main.latestCards,
						cards.slice(0, settings.main.latestLimit),
					),
				},
				{
					header: compactHeader(settings.main.popularGenresTitle),
					cards: publicationCatalogCardProps(settings.main.genreCards, popularGenreCards),
					panel,
				},
			],
		},
	};
};

const archiveCards = (cards: CollectionSection["content"]["cards"], items: PCardData[]): PCardProps => ({
	template: cards?.template,
	layout: cards?.layout,
	columns: cardColumns(cards?.columns),
	gap: cards?.gap,
	mediaRatio: cards?.mediaRatio,
	separator: cards?.separator,
	headingLevel: headingLevel(cards?.headingLevel),
	slots: cards?.slots,
	items,
});

const buildProjectsArchive = async (
	section: ProjectsArchiveSection,
	context: PageBuilderContext,
): Promise<PageArchiveRegion> => {
	const { toolbar, cards, routes, itemPresentation, pagination, emptyLabel } = section.content;
	const projects = await getProjects();
	const visibleProjects = projects.filter((project) => {
		if (context.categorySlug) return project.categorySlug === context.categorySlug;
		if (context.tagSlug) return project.tags.some((tag) => tag.slug === context.tagSlug);
		return true;
	});
	const categories = Array.from(new Map(projects.map((project) => [project.categorySlug, {
		label: project.category,
		value: project.categorySlug,
		href: `${routes.categoryBase}${project.categorySlug}`,
	}])).values());

	return {
		key: section.id,
		component: "archive",
		section: sectionFrame(section),
		props: {
			mode: "taxonomy",
			toolbar: { data: {
				filter: { label: toolbar.filterLabel, activeValue: context.categorySlug ?? toolbar.allValue, tabs: [{ label: toolbar.allLabel, value: toolbar.allValue, href: routes.base }, ...categories] },
				sort: { label: toolbar.sortLabel, value: toolbar.sortValue, options: toolbar.sortOptions },
				view: { label: toolbar.viewLabel, gridLabel: toolbar.gridViewLabel, listLabel: toolbar.listViewLabel },
			} },
			cards: archiveCards(cards, visibleProjects.map((project): PCardData => ({
				href: project.href,
				ariaLabel: project.title,
				title: [project.title],
				excerpt: project.summary,
				filterValue: project.categorySlug,
				sortValue: project.year,
				size: itemPresentation.size,
				supportingLabel: project.outcome,
				tags: project.tags.map((tag) => ({ label: tag.label, href: `${itemPresentation.routes.tagBase}${tag.slug}` })),
				tagsLabel: itemPresentation.tagsLabel,
				appearance: project.tone === "dark" ? itemPresentation.darkAppearance : itemPresentation.lightAppearance,
				metadata: {
					separator: itemPresentation.separator,
					items: [
						{ type: "index", label: project.number, display: itemPresentation.metadataDisplay },
						{ type: "category", label: project.category.toUpperCase(), href: `${itemPresentation.routes.categoryBase}${project.categorySlug}`, display: itemPresentation.metadataDisplay },
						{ type: "datetime", label: project.year, datetime: project.year, display: itemPresentation.metadataDisplay },
					],
				},
				action: itemPresentation.actionLabel ? { label: itemPresentation.actionLabel, href: project.href, icon: itemPresentation.actionIcon } : undefined,
				media: project.image ? { src: project.image, alt: project.alt || project.title, width: itemPresentation.imageWidth, height: itemPresentation.imageHeight } : undefined,
			}))),
			emptyLabel,
			pagination: { ...pagination, totalPages: Math.max(1, Math.ceil(visibleProjects.length / pagination.pageSize)) },
		},
	};
};

const buildLabsArchive = async (
	section: LabsArchiveSection,
	context: PageBuilderContext,
): Promise<PageArchiveRegion> => {
	const { toolbar, sidebar, routes, cards, itemPresentation, pagination, emptyLabel, resultLabel } = section.content;
	const labs = await getLabs();
	const visibleLabs = labs.filter((lab) => (!context.categorySlug || lab.category.slug === context.categorySlug) && (!context.technologySlug || lab.technologies.some((technology) => technology.slug === context.technologySlug)));
	const categories = Array.from(new Map(labs.map((lab) => [lab.category.slug, lab.category])).values());
	const technologies = Array.from(new Map(labs.flatMap((lab) => lab.technologies.map((technology) => [technology.slug, technology] as const))).values());
	const categoryFilter: PFilterChoiceGroupData = {
		appearance: sidebar.category.appearance,
		control: sidebar.category.control,
		legend: sidebar.category.legend,
		name: sidebar.category.name,
		type: sidebar.category.type,
		options: [{ label: sidebar.category.allLabel, value: sidebar.category.allValue, href: sidebar.category.allHref, count: labs.length, checked: !context.categorySlug }, ...categories.map((category) => ({ label: category.label, value: category.slug, href: `${routes.categoryBase}${category.slug}`, count: labs.filter((lab) => lab.category.slug === category.slug).length, checked: context.categorySlug === category.slug }))],
	};
	const technologyFilter: PFilterChoiceGroupData = {
		appearance: sidebar.technology.appearance,
		control: sidebar.technology.control,
		legend: sidebar.technology.legend,
		name: sidebar.technology.name,
		type: sidebar.technology.type,
		options: technologies.map((technology) => ({ label: technology.label, value: technology.slug, href: `${routes.technologyBase}${technology.slug}`, count: labs.filter((lab) => lab.technologies.some((item) => item.slug === technology.slug)).length, checked: context.technologySlug === technology.slug })),
	};

	return {
		key: section.id,
		component: "archive",
		section: sectionFrame(section),
		props: {
			mode: "faceted",
			toolbar: { data: { search: toolbar.search, selects: toolbar.selects, sort: toolbar.sort, view: toolbar.view } },
			sidebar: { label: sidebar.label, filter: { data: {
				filterLabel: sidebar.filterLabel,
				category: categoryFilter,
				groups: [technologyFilter],
			} } },
			result: { count: visibleLabs.length, label: resultLabel },
			cards: archiveCards(cards, visibleLabs.map((lab): PCardData => ({
				href: lab.href,
				ariaLabel: `${itemPresentation.ariaLabelPrefix}${lab.title}`,
				title: [lab.title], excerpt: lab.summary, media: lab.image,
				metadata: { items: [{ type: "category", label: lab.category.label, href: `${itemPresentation.routes.categoryBase}${lab.category.slug}`, display: itemPresentation.categoryDisplay }] },
				badge: { label: lab.statusLabel, tone: lab.status === "complete" ? itemPresentation.completeBadgeTone : itemPresentation.activeBadgeTone },
				tags: lab.technologies.map((technology) => ({ label: technology.label, href: `${itemPresentation.routes.technologyBase}${technology.slug}` })),
				tagsLabel: `${lab.title}${itemPresentation.tagsLabelSuffix}`,
				metrics: [
					{ icon: itemPresentation.metricIcons[0], label: String(lab.stars) },
					{ icon: itemPresentation.metricIcons[1], label: String(lab.forks) },
					{ icon: itemPresentation.metricIcons[2], label: lab.updatedLabel },
				],
				facets: { category: [lab.category.slug], status: [lab.status], technology: lab.technologies.map((technology) => technology.slug) },
				searchValue: [lab.title, lab.summary, lab.category.label, ...lab.technologies.map((technology) => technology.label)].join(" "),
			}))),
			emptyLabel,
			pagination: { ...pagination, totalPages: Math.max(1, Math.ceil(visibleLabs.length / pagination.pageSize)) },
		},
	};
};

const buildProductsArchive = async (
	section: ProductsArchiveSection,
	context: PageBuilderContext,
): Promise<PageArchiveRegion> => {
	const { toolbar, sidebar, routes, cards, itemPresentation, pagination, emptyLabel, result } = section.content;
	const [products, categories] = await Promise.all([getProducts(), getProductCategories()]);
	const visibleProducts = context.categorySlug ? products.filter((product) => product.categorySlug === context.categorySlug) : products;
	const categoryFilters = [{ label: toolbar.category.allLabel, value: toolbar.category.allValue, href: routes.base, checked: !context.categorySlug }, ...categories.map((category) => ({ ...category, href: `${routes.categoryBase}${category.value}`, checked: context.categorySlug === category.value }))];
	const platformFilters = toolbar.platform.options
		.filter((option) => option.value !== toolbar.platform.allValue)
		.map((option) => ({ ...option, checked: false }));
	const categoryFilter: PFilterChoiceGroupData = { ...sidebar.category, options: categoryFilters };
	const platformFilter: PFilterChoiceGroupData = { ...sidebar.platform, options: platformFilters };
	const licenseFilter: PFilterChoiceGroupData | undefined = sidebar.license
		? { ...sidebar.license }
		: undefined;
	const ratingValues = Array.from(new Set(products.map((product) => product.rating))).sort(
		(first, second) => second - first,
	);
	const advertisement: PAdvertisementData = {
		title: sidebar.advertisement.title,
		description: sidebar.advertisement.description,
		image: sidebar.advertisement.image,
		action: {
			href: sidebar.advertisement.action.href,
			label: sidebar.advertisement.action.label,
			icon: sidebar.advertisement.action.icon,
		},
	};

	return {
		key: section.id,
		component: "archive",
		section: sectionFrame(section),
		props: {
			mode: "faceted",
			toolbar: { data: {
				search: toolbar.search,
				selects: [
					{ control: toolbar.category.control, id: toolbar.category.id, label: toolbar.category.label, value: context.categorySlug ?? toolbar.category.value, options: categoryFilters },
					{ control: toolbar.platform.control, id: toolbar.platform.id, label: toolbar.platform.label, value: toolbar.platform.value, options: platformFilters },
				],
				sort: toolbar.sort,
				view: toolbar.view,
			} },
			sidebar: {
				label: sidebar.label,
				filter: { data: {
					filterLabel: sidebar.filterLabel,
					category: categoryFilter,
					groups: [platformFilter, ...(licenseFilter ? [licenseFilter] : [])],
					range: sidebar.price,
					ratings: sidebar.ratings ? {
						legend: sidebar.ratings.legend,
						name: "rating",
						options: ratingValues.map((value) => ({
							value,
							count: products.filter((product) => product.rating >= value).length,
						})),
					} : undefined,
				} },
				advertisement: { data: advertisement },
			},
			result: { count: visibleProducts.length, label: result.label },
			cards: archiveCards(cards, visibleProducts.map((product): PCardData => ({
				href: `${itemPresentation.routes.base}${product.slug}`,
				ariaLabel: `${itemPresentation.ariaLabelPrefix}${product.title}`,
				title: [product.title], excerpt: product.description,
				media: { src: product.image, alt: `${product.title}${itemPresentation.imageAltSuffix}`, width: itemPresentation.imageWidth, height: itemPresentation.imageHeight },
				metadata: { items: [{ type: "category", label: product.category, href: `${itemPresentation.routes.categoryBase}${product.categorySlug}`, display: itemPresentation.categoryDisplay }] },
				action: { href: itemPresentation.actionHref, label: `${itemPresentation.actionLabelPrefix}${product.title}`, icon: itemPresentation.actionIcon },
				product: { badge: product.badge, category: product.category, categorySlug: product.categorySlug, license: itemPresentation.license, oldPrice: product.oldPrice, platform: product.platform, price: product.price, rating: product.rating, reviews: product.reviews },
			}))),
			emptyLabel,
			pagination: { ...pagination, totalPages: Math.max(1, Math.ceil(visibleProducts.length / pagination.pageSize)) },
		},
	};
};

const buildBlogArchive = async (
	section: BlogArchiveSection,
	context: PageBuilderContext,
): Promise<PageArchiveRegion> => {
	const { toolbar, sidebar, itemPresentation, result, cards, pagination, emptyLabel } = section.content;
	const insights = await getInsights();
	const visibleInsights = insights.filter((insight) =>
		(!context.categorySlug || insight.categorySlug === context.categorySlug) &&
		(!context.tagSlug || insight.tags.some((tag) => tag.slug === context.tagSlug)),
	);
	const categories = Array.from(new Map(insights.map((insight) => [insight.categorySlug, {
		label: insight.category,
		slug: insight.categorySlug,
	}])).values());
	const presentation = itemPresentation;
	const categoryFilter: PFilterChoiceGroupData = {
		appearance: sidebar.filter.appearance,
		control: sidebar.filter.control,
		legend: sidebar.filter.legend,
		name: sidebar.filter.name,
		type: sidebar.filter.type,
		options: [
			{ label: sidebar.filter.allLabel, value: toolbar.category.allValue, href: presentation.routes.base, count: insights.length, checked: !context.categorySlug },
			...categories.map((category) => ({ label: category.label, value: category.slug, href: `${presentation.routes.categoryBase}${category.slug}`, count: insights.filter((insight) => insight.categorySlug === category.slug).length, checked: context.categorySlug === category.slug })),
		],
	};
	const newsletter: PAdvertisementData = {
		title: sidebar.newsletter.title,
		description: sidebar.newsletter.description,
		image: sidebar.newsletter.image,
		action: {
			href: sidebar.newsletter.action.href,
			label: sidebar.newsletter.action.label,
			icon: sidebar.newsletter.action.icon,
		},
		form: sidebar.newsletter.form,
	};

	return {
		key: section.id,
		component: "archive",
		section: sectionFrame(section),
		props: {
			mode: "faceted",
			toolbar: { data: {
				search: toolbar.search,
				selects: [{
					control: toolbar.category.control,
					id: toolbar.category.id,
					label: toolbar.category.label,
					value: context.categorySlug ?? toolbar.category.allValue,
					options: [
						{ label: toolbar.category.allLabel, value: toolbar.category.allValue, href: presentation.routes.base },
						...categories.map((category) => ({
							label: category.label,
							value: category.slug,
							href: `${presentation.routes.categoryBase}${category.slug}`,
						})),
					],
				}],
				sort: toolbar.sort,
				view: toolbar.view,
			} },
			sidebar: {
				label: sidebar.label,
				filter: { data: { groups: [categoryFilter] } },
				cardsHeader: {
					data: { title: sidebar.featured.title },
					appearance: sidebar.featured.header.appearance,
					headingLevel: headingLevel(sidebar.featured.header.headingLevel),
				},
				cards: archiveCards(sidebar.featured.cards, insights.slice(0, sidebar.featured.limit).map((insight): PCardData => ({
					href: insight.href, ariaLabel: insight.title, title: [insight.title], excerpt: insight.excerpt,
					metadata: { separator: presentation.separator, items: [
						{ type: "category", label: insight.category, href: `${presentation.routes.categoryBase}${insight.categorySlug}`, display: presentation.metadataDisplay },
						{ type: "reading-time", label: insight.readTime, display: presentation.metadataDisplay },
					] },
					secondaryMetadata: { separator: presentation.separator, items: [
						{ type: "author", label: insight.author, display: presentation.metadataDisplay },
						{ type: "datetime", label: insight.publishedLabel, datetime: insight.publishedAt, display: presentation.metadataDisplay },
					] },
					tags: insight.tags.map((tag) => ({ label: tag.label, href: `${presentation.routes.tagBase}${tag.slug}` })),
					tagsLabel: presentation.tagsLabelSuffix ? `${insight.title}${presentation.tagsLabelSuffix}` : undefined,
					facets: { category: [insight.categorySlug], tag: insight.tags.map((tag) => tag.slug) },
					searchValue: [insight.title, insight.excerpt, insight.category, insight.author, ...insight.tags.map((tag) => tag.label)].join(" "), sortValue: insight.publishedAt,
					media: insight.image && insight.imageAlt ? { src: insight.image, alt: insight.imageAlt, width: presentation.imageWidth, height: presentation.imageHeight } : undefined,
				}))),
				advertisement: { template: sidebar.newsletter.template, data: newsletter },
			},
			result: {
				header: {
					data: { title: result.title },
					...(result.header && {
						appearance: result.header.appearance,
						headingLevel: headingLevel(result.header.headingLevel),
					}),
				},
			},
			cards: archiveCards(cards, visibleInsights.map((insight): PCardData => ({
				href: insight.href, ariaLabel: insight.title, title: [insight.title], excerpt: insight.excerpt,
				metadata: { separator: presentation.separator, items: [
					{ type: "category", label: insight.category, href: `${presentation.routes.categoryBase}${insight.categorySlug}`, display: presentation.metadataDisplay },
					{ type: "reading-time", label: insight.readTime, display: presentation.metadataDisplay },
				] },
				secondaryMetadata: { separator: presentation.separator, items: [
					{ type: "author", label: insight.author, display: presentation.metadataDisplay },
					{ type: "datetime", label: insight.publishedLabel, datetime: insight.publishedAt, display: presentation.metadataDisplay },
				] },
				tags: insight.tags.map((tag) => ({ label: tag.label, href: `${presentation.routes.tagBase}${tag.slug}` })),
				tagsLabel: presentation.tagsLabelSuffix ? `${insight.title}${presentation.tagsLabelSuffix}` : undefined,
				facets: { category: [insight.categorySlug], tag: insight.tags.map((tag) => tag.slug) },
				searchValue: [insight.title, insight.excerpt, insight.category, insight.author, ...insight.tags.map((tag) => tag.label)].join(" "), sortValue: insight.publishedAt,
				media: insight.image && insight.imageAlt ? { src: insight.image, alt: insight.imageAlt, width: presentation.imageWidth, height: presentation.imageHeight } : undefined,
			}))),
			emptyLabel,
			pagination: { ...pagination, totalPages: Math.max(1, Math.ceil(visibleInsights.length / pagination.pageSize)) },
		},
	};
};

const isProjectsArchiveSection = (section: ArchiveSection): section is ProjectsArchiveSection =>
	section.content.source.collection === "projects";
const isLabsArchiveSection = (section: ArchiveSection): section is LabsArchiveSection =>
	section.content.source.collection === "labs";
const isProductsArchiveSection = (section: ArchiveSection): section is ProductsArchiveSection =>
	section.content.source.collection === "products";
const isBlogArchiveSection = (section: ArchiveSection): section is BlogArchiveSection =>
	section.content.source.collection === "blog";

const resolveArchive = async (
	section: ArchiveSection,
	context: PageBuilderContext,
): Promise<PageArchiveRegion> => {
	if (isProjectsArchiveSection(section)) return buildProjectsArchive(section, context);
	if (isLabsArchiveSection(section)) return buildLabsArchive(section, context);
	if (isProductsArchiveSection(section)) return buildProductsArchive(section, context);
	if (isBlogArchiveSection(section)) return buildBlogArchive(section, context);

	throw new Error("Unsupported archive collection.");
};

const resolveHeroProps = (section: HeroSection): PHeroProps => {
	const content = section.content;
	if (
		typeof content.eyebrow !== "string" ||
		!Array.isArray(content.title) ||
		typeof content.description !== "string" ||
		!content.image ||
		!content.actions
	) {
		throw new Error(`Invalid hero content for section "${section.id}".`);
	}

	const socialLinks = content.socialLinks?.map((link) => {
		if (!link.icon) {
			throw new Error(`Hero social link in section "${section.id}" requires an icon.`);
		}
		return { href: link.href, label: link.label, icon: link.icon };
	});

	return {
		template: section.template,
		data: {
			id: content.id ?? section.id,
			eyebrow: content.eyebrow,
			title: content.title,
			accent: content.accent,
			description: content.description,
			actions: content.actions,
			socialLinks,
			image: content.image,
			scrollLabel: content.scrollLabel,
		},
	};
};

const resolvePageHeaderProps = (section: PageHeaderSection): PPageHeaderProps => {
	const content = section.content;

	switch (section.template) {
		case "split-media":
			if (
				!content.breadcrumb ||
				!Array.isArray(content.title) ||
				typeof content.description !== "string"
			) {
				throw new Error(`Invalid split-media page header content for section "${section.id}".`);
			}
			return {
				template: "split-media",
				data: {
					breadcrumb: content.breadcrumb,
					title: content.title,
					description: content.description,
					image: content.image,
				},
			};

		case "split-benefits": {
			if (
				typeof content.eyebrow !== "string" ||
				typeof content.title !== "string" ||
				typeof content.accent !== "string" ||
				typeof content.description !== "string" ||
				!content.image
			) {
				throw new Error(`Invalid split-benefits page header content for section "${section.id}".`);
			}

			const benefits = content.benefits && "items" in content.benefits
				? content.benefits
				: undefined;

			return {
				template: "split-benefits",
				data: {
					id: content.id ?? section.id,
					eyebrow: content.eyebrow,
					title: content.title,
					accent: content.accent,
					description: content.description,
					benefits,
					image: content.image,
				},
			};
		}

		case "immersive":
			if (
				typeof content.eyebrow !== "string" ||
				typeof content.title !== "string" ||
				typeof content.accent !== "string" ||
				typeof content.description !== "string" ||
				typeof content.actionsLabel !== "string" ||
				!content.actions ||
				!content.image ||
				!content.metrics
			) {
				throw new Error(`Invalid immersive page header content for section "${section.id}".`);
			}
			return {
				template: "immersive",
				data: {
					id: content.id ?? section.id,
					eyebrow: content.eyebrow,
					title: content.title,
					accent: content.accent,
					description: content.description,
					actionsLabel: content.actionsLabel,
					actions: content.actions,
					image: content.image,
					quote: content.quote,
					quoteCredit: content.quoteCredit,
					metrics: content.metrics,
				},
			};
	}
};

const resolveCtaProps = (section: CtaSection): PCtaProps => {
	const content = section.content;
	if (typeof content.title !== "string") {
		throw new Error(`Invalid CTA title for section "${section.id}".`);
	}

	let price: PCtaProps["data"]["price"];
	if (content.price) {
		if (typeof content.price.period !== "string") {
			throw new Error(`CTA price in section "${section.id}" requires a period.`);
		}
		price = {
			current: content.price.current,
			period: content.price.period,
			previous: content.price.previous,
		};
	}

	return {
		template: section.template,
		data: {
			id: content.id ?? section.id,
			title: content.title,
			description: content.description,
			action: content.action
				? { href: content.action.href, label: content.action.label }
				: undefined,
			form: content.form,
			image: content.image,
			features: content.features,
			price,
		},
	};
};

const resolveSection = async (
	section: PageSectionData,
	context: PageBuilderContext,
): Promise<PageRegion> => {
	const frame = sectionFrame(section);

	switch (section.type) {
		case "hero":
			return {
				key: section.id,
				component: "hero",
				section: frame,
				props: resolveHeroProps(section),
			};
		case "page-header":
			return {
				key: section.id,
				component: "page-header",
				section: frame,
				props: resolvePageHeaderProps(section),
			};
		case "article":
			return {
				key: section.id,
				component: "article",
				section: frame,
				props: { blocks: section.content.blocks, template: section.template },
			};
		case "cta":
			return {
				key: section.id,
				component: "cta",
				section: frame,
				props: resolveCtaProps(section),
			};
		case "collection": {
			if (section.template === "sidebar") {
				return resolvePublicationCatalogCollection(section);
			}
			const items = await resolveCollectionItems(section);
			return {
				key: section.id,
				component: "collection",
				section: frame,
				props: {
					template: section.template === "split" ? "split" : "stack",
					header: sectionHeader(section),
					cardGroups: [cardConfig(section, items)],
				},
			};
		}
		case "archive":
			return resolveArchive(section, context);
	}
};

export async function getPageBuilderData(
	page: PageEntryData,
	context: PageBuilderContext = {},
): Promise<ResolvedPageData & { isHome: boolean }> {
	const regions = await Promise.all(page.content.sections.map((section) => resolveSection(section, context)));
	return {
		isHome: page.slug === "/",
		pageTemplate: page.content.layout.template === "home" ? "stacked" : page.content.layout.template,
		regions,
	};
}
