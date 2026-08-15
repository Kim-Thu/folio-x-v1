import { getPublicationDetailSettings, getPublications } from "@/data/cms";
import type { PageRegion } from "@/types/components/object/project/page/PageRegion.types";
import type {
	PublicationCollection,
	PublicationDetailPageData,
} from "@/types/components/pages/publication-detail/PublicationDetailPage.types";
import type { CIconName } from "@/types/components/object/component/CIcon.types";

export async function getPublicationDetailPaths(collection: PublicationCollection) {
	const entries = await getPublications(collection);
	return entries.map((entry) => ({ params: { slug: entry.slug } }));
}

export async function getPublicationDetailPageData(
	collection: PublicationCollection,
	entrySlug: string,
): Promise<PublicationDetailPageData> {
	const [entries, presentation] = await Promise.all([
		getPublications(collection),
		getPublicationDetailSettings(),
	]);
	const entry = entries.find((item) => item.slug === entrySlug);
	if (!entry) throw new Error(`Missing publication: ${collection}/${entrySlug}`);

	const detail = entry.detail;
	if (!detail) throw new Error(`Missing CMS publication detail: ${collection}/${entry.slug}`);

	const collectionPresentation = presentation.collections[collection];
	const basePath = collectionPresentation.basePath;
	const description = detail.description?.length ? detail.description : [entry.summary];
	const configuredChapters = [...(detail.reader ?? [])].sort((a, b) => b.number - a.number);
	const chapterItems = configuredChapters.map((chapter) => ({
		order: chapter.number,
		number: `${presentation.chapters.labels.numberPrefix}${chapter.number}`,
		title: chapter.title,
		publishedAt: chapter.publishedAt,
		publishedLabel: chapter.publishedLabel,
		views: chapter.views,
		href: `${basePath}/${entry.slug}/${presentation.routes.chapterSegment}/${chapter.number}`,
		action: presentation.chapters.itemAction,
	}));

	const metrics: Array<{ label: string; value: string; icon: CIconName }> = [
		{
			label: presentation.header.labels.rating,
			value: String(entry.rating),
			icon: presentation.header.metrics.rating.icon,
		},
		{
			label: presentation.header.labels.reads,
			value: entry.views,
			icon: presentation.header.metrics.reads.icon,
		},
		{
			label: presentation.header.labels.chapters,
			value: String(entry.chapters),
			icon: presentation.header.metrics.chapters.icon,
		},
	];
	if (detail.followers) {
		metrics.push({
			label: presentation.header.labels.followers,
			value: detail.followers,
			icon: presentation.header.metrics.followers.icon,
		});
	}

	const facts = [
		{ label: presentation.header.labels.author, value: entry.author },
		{
			label: presentation.header.labels.tags,
			value: entry.genres.map((genre) => genre.label).join(", "),
		},
		...(detail.language
			? [{ label: presentation.header.labels.language, value: detail.language }]
			: []),
		{
			label: presentation.header.labels.status,
			value:
				entry.status === "ongoing"
					? presentation.header.labels.ongoing
					: presentation.header.labels.complete,
		},
		{ label: presentation.header.labels.updated, value: entry.updatedLabel },
		{ label: presentation.header.labels.views, value: entry.views },
	];

	const tabs = [
		...(configuredChapters.length > 0 ? [presentation.navigation.tabs.chapters] : []),
		presentation.navigation.tabs.overview,
	];
	const activeValue = configuredChapters.length > 0
		? presentation.navigation.tabs.chapters.value
		: presentation.navigation.tabs.overview.value;

	const regions: PageRegion[] = [
		{
			key: presentation.header.id,
			component: "page-header",
			section: {
				id: presentation.header.id,
				...presentation.header.settings,
			},
			props: {
				template: presentation.header.template,
				data: {
					breadcrumb: {
						label: presentation.header.labels.breadcrumb,
						items: [
							{
								label: collectionPresentation.collectionLabel,
								href: basePath,
							},
						],
						current: entry.title,
					},
					cover: entry.cover,
					tagsLabel: presentation.header.labels.tags,
					tags: entry.genres.map((genre) => ({
						label: genre.label,
						href: `${basePath}/${presentation.routes.categorySegment}/${genre.slug}`,
					})),
					title: entry.title,
					author: {
						label: presentation.header.labels.author,
						name: entry.author,
					},
					metrics,
					actionsLabel: presentation.header.labels.actions,
					actions: configuredChapters.length > 0
						? [
								{
									label: presentation.header.labels.primaryAction,
									href: `#${presentation.chapters.id}`,
									...presentation.header.primaryAction,
								},
							]
						: [],
					description,
					facts: {
						title: presentation.header.labels.factsTitle,
						items: facts,
					},
				},
			},
		},
		{
			key: presentation.navigation.id,
			component: "tabs",
			section: {
				id: presentation.navigation.id,
				...presentation.navigation.settings,
			},
			props: {
				label: presentation.navigation.label,
				appearance: presentation.navigation.appearance,
				tone: presentation.navigation.tone,
				activeValue,
				tabs,
			},
		},
		{
			key: presentation.chapters.id,
			component: "group",
			section: {
				id: presentation.chapters.id,
				...presentation.chapters.settings,
			},
			props: {
				template: "sidebar",
				asideLabel: presentation.chapters.labels.aside,
				regions: [
					{
						key: "publication-overview",
						component: "details",
						placement: "aside",
						section: false,
						props: {
							list: {
								items: [
									{
										label: presentation.chapters.labels.introduction,
										value: description[0],
									},
								],
							},
							tags: detail.tags?.length
								? {
										title: presentation.chapters.labels.tags,
										list: {
											label: presentation.chapters.labels.tags,
											items: detail.tags.map((tag) => ({
												label: tag.label,
												href: `${basePath}/${presentation.routes.tagSegment}/${tag.slug}`,
											})),
										},
									}
								: undefined,
						},
					},
					...(chapterItems.length > 0
						? [
								{
									key: "chapter-index",
									component: "entry-index" as const,
									section: false as const,
									props: {
										id: presentation.chapters.id,
										label: presentation.chapters.labels.index,
										title: presentation.chapters.labels.title,
										sort: presentation.chapters.sort,
										listViewLabel: presentation.chapters.labels.listView,
										items: chapterItems,
										visibleCount: chapterItems.length,
									},
								},
							]
						: []),
				],
			},
		},
	];

	return {
		entry,
		pageTemplate: presentation.page.template ,
		regions,
	};
}
