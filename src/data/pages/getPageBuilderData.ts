import {
	getInsights,
	getLabs,
	getProductCategories,
	getProducts,
	getProjects,
	getPublications,
} from "@/data/cms";
import {
	mapInsightToCard,
	mapLabToCard,
	mapProductToCard,
	mapProjectToCard,
	mapPublicationToCard,
} from "@/data/mappers/card";
import type { PAdvertisementData } from "@/types/components/object/project/advertisement/PAdvertisement.types";
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
		return take(await getProducts(), content.source.limit).map((item) =>
			mapProductToCard(item, content.itemPresentation),
		);
	}
	if (isProjectsCollectionContent(content)) {
		return take(await getProjects(), content.source.limit).map((item) =>
			mapProjectToCard(item, content.itemPresentation),
		);
	}
	if (isLabsCollectionContent(content)) {
		return take(await getLabs(), content.source.limit).map((item) =>
			mapLabToCard(item, content.itemPresentation),
		);
	}
	if (isBlogCollectionContent(content)) {
		return take(await getInsights(), content.source.limit).map((item) =>
			mapInsightToCard(item, content.itemPresentation),
		);
	}
	if (isComicsCollectionContent(content)) {
		return take(await getPublications("comics"), content.source.limit).map((item) =>
			mapPublicationToCard(item, "comics", content.itemPresentation),
		);
	}
	if (isNovelsCollectionContent(content)) {
		return take(await getPublications("novels"), content.source.limit).map((item) =>
			mapPublicationToCard(item, "novels", content.itemPresentation),
		);
	}
	if (isPublicationsCollectionContent(content)) {
		const [novels, comics] = await Promise.all([
			getPublications("novels"),
			getPublications("comics"),
		]);
		return take([
			...novels.map((item) => mapPublicationToCard(item, "novels", content.itemPresentation.novels)),
			...comics.map((item) => mapPublicationToCard(item, "comics", content.itemPresentation.comics)),
		], content.source.limit);
	}

	return [];
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
			cards: archiveCards(cards, visibleProjects.map((project) =>
				mapProjectToCard(project, itemPresentation),
			)),
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
			cards: archiveCards(cards, visibleLabs.map((lab) => mapLabToCard(lab, itemPresentation))),
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
	const platformFilters = toolbar.platform.options.map((option) => ({ ...option, checked: option.value === toolbar.platform.value }));
	const categoryFilter: PFilterChoiceGroupData = { ...sidebar.category, options: categoryFilters };
	const platformFilter: PFilterChoiceGroupData = { ...sidebar.platform, options: platformFilters };
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
				filter: { data: { filterLabel: sidebar.filterLabel, category: categoryFilter, groups: [platformFilter] } },
				advertisement: { data: advertisement },
			},
			result: { count: visibleProducts.length, label: result.label },
			cards: archiveCards(cards, visibleProducts.map((product) =>
				mapProductToCard(product, itemPresentation),
			)),
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
					options: [{ label: toolbar.category.allLabel, value: toolbar.category.allValue }, ...categories.map((category) => ({ label: category.label, value: category.slug }))],
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
				cards: archiveCards(sidebar.featured.cards, insights.slice(0, sidebar.featured.limit).map((insight) => mapInsightToCard(insight, presentation))),
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
			cards: archiveCards(cards, visibleInsights.map((insight) => mapInsightToCard(insight, presentation))),
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
				props: { template: section.template, data: section.content } as Extract<PageRegion, { component: "hero" }>["props"],
			};
		case "page-header":
			return {
				key: section.id,
				component: "page-header",
				section: frame,
				props: { template: section.template, data: section.content } as Extract<PageRegion, { component: "page-header" }>["props"],
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
				props: { template: section.template, data: section.content } as Extract<PageRegion, { component: "cta" }>["props"],
			};
		case "collection": {
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
