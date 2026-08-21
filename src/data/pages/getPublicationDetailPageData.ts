import { getPublicationDetailSettings, getPublications } from "@/data/cms";
import type { PageRegion } from "@/types/components/object/project/page/PageRegion.types";
import type {
	PublicationCollection,
	PublicationDetailPageData,
} from "@/types/components/pages/publication-detail/PublicationDetailPage.types";
import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { PCardProps } from "@/types/components/object/project/card/PCard.types";

const publicationRelatedDefaults = {
	title: "You may also like",
	limit: 3,
	actionLabel: "View more",
} as const;

const publicationChapterDefaults = {
	visibleCount: 8,
	showAllTemplate: "View all chapters ({count})",
} as const;

const publicationSubscriptionDefaults = {
	id: "publication-subscription",
	title: "Never miss a new chapter",
	description: "Subscribe to receive a notification whenever a new chapter is published.",
	settings: {
		theme: "canvas" as const,
		spacing: "compact" as const,
		container: "site" as const,
	},
	image: {
		src: "/uploads/library-newsletter-book.webp",
		alt: "Newsletter illustration",
		width: 1448,
		height: 1086,
	},
	form: {
		formName: "publication-subscription",
		inputId: "publication-subscription-email",
		inputLabel: "Email address",
		placeholder: "Your email address...",
		submitLabel: "Subscribe",
	},
} as const;

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
	const entryIndex = entries.findIndex((item) => item.slug === entrySlug);
	const entry = entries[entryIndex];
	if (!entry) throw new Error(`Missing publication: ${collection}/${entrySlug}`);

	const previousEntry = entryIndex > 0 ? entries[entryIndex - 1] : undefined;
	const nextEntry = entryIndex < entries.length - 1 ? entries[entryIndex + 1] : undefined;
	const detail = entry.detail;
	if (!detail) throw new Error(`Missing CMS publication detail: ${collection}/${entry.slug}`);

	const relatedPresentation = presentation.related ?? publicationRelatedDefaults;
	const chapterVisibleCount = presentation.chapters.visibleCount ?? publicationChapterDefaults.visibleCount;
	const chapterShowAllTemplate =
		presentation.chapters.labels.showAllTemplate ?? publicationChapterDefaults.showAllTemplate;
	const subscriptionPresentation = presentation.subscription ?? publicationSubscriptionDefaults;

	const collectionPresentation = presentation.collections[collection];
	const basePath = collectionPresentation.basePath;
	const publicationHref = `${basePath}/${entry.slug}`;
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

	const relatedEntries = entries
		.filter((item) => item.slug !== entry.slug)
		.sort((a, b) => {
			const aScore = a.genres.filter((genre) =>
				entry.genres.some((entryGenre) => entryGenre.slug === genre.slug),
			).length;
			const bScore = b.genres.filter((genre) =>
				entry.genres.some((entryGenre) => entryGenre.slug === genre.slug),
			).length;
			return bScore - aScore || a.order - b.order;
		})
		.slice(0, relatedPresentation.limit);

	const relatedCards: PCardProps = {
		template: "list",
		columns: 1,
		gap: "sm",
		card: {
			template: "compact-media",
			mediaRatio: "portrait",
			slots: {
				media: true,
				metadata: true,
				title: true,
				excerpt: false,
				tags: false,
				metrics: true,
				action: false,
				icon: false,
			},
			source: "static",
		},
		items: relatedEntries.map((item) => ({
			href: item.href,
			ariaLabel: item.title,
			title: [item.title],
			media: item.cover,
			metadata: {
				items: item.genres.slice(0, 2).map((genre) => ({
					type: "category" as const,
					label: genre.label,
					display: "text" as const,
				})),
			},
			metrics: [
				{ icon: "star" as const, label: String(item.rating) },
				{ icon: "eye" as const, label: item.views },
			],
		})),
	};

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
					share: {
						label: presentation.header.share.label,
						links: [
							{
								label: presentation.header.share.twitterLabel,
								href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(publicationHref)}`,
								icon: "twitter",
							},
							{
								label: presentation.header.share.facebookLabel,
								href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicationHref)}`,
								icon: "facebook",
							},
							{
								label: presentation.header.share.copyLabel,
								href: publicationHref,
								icon: "link",
							},
						],
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
				asidePosition: "end",
				stickyAside: false,
				asideGap: "md",
				gap: "lg",
				regions: [
					{
						key: "publication-introduction",
						component: "details",
						placement: "aside",
						section: false,
						props: {
							title: presentation.chapters.labels.introduction,
							list: {
								items: [
									{
										label: "",
										value: description[0],
									},
								],
							},
						},
					},
					...(detail.tags?.length
						? [
								{
									key: "publication-tags",
									component: "details" as const,
									placement: "aside" as const,
									section: false as const,
									props: {
										title: presentation.chapters.labels.tags,
										list: { items: [] },
										tags: {
											title: presentation.chapters.labels.tags,
											list: {
												label: presentation.chapters.labels.tags,
												items: detail.tags.map((tag) => ({
													label: tag.label,
													href: `${basePath}/${presentation.routes.tagSegment}/${tag.slug}`,
												})),
											},
										},
									},
								},
							]
						: []),
					...(relatedEntries.length > 0
						? [
								{
									key: "publication-related",
									component: "cards" as const,
									placement: "aside" as const,
									section: false as const,
									props: {
										panel: true,
										header: {
											data: { title: relatedPresentation.title },
											appearance: "compact" as const,
											headingLevel: 2 as const,
										},
										cards: relatedCards,
										action: {
											href: basePath,
											label: relatedPresentation.actionLabel,
											variant: "outline" as const,
											tone: "light" as const,
										},
									},
								},
							]
						: []),
					...(chapterItems.length > 0
						? [
								{
									key: "chapter-index",
									component: "entry-index" as const,
									placement: "main" as const,
									section: false as const,
									props: {
										id: presentation.chapters.id,
										label: presentation.chapters.labels.index,
										title: presentation.chapters.labels.title,
										sort: presentation.chapters.sort,
										listViewLabel: presentation.chapters.labels.listView,
										items: chapterItems,
										visibleCount: Math.min(
											chapterVisibleCount,
											chapterItems.length,
										),
										footerAction:
											chapterItems.length > chapterVisibleCount
												? {
													label: chapterShowAllTemplate.replace(
														"{count}",
														String(chapterItems.length),
													),
													variant: "outline" as const,
													tone: "light" as const,
												}
												: undefined,
									},
								},
							]
						: []),
				],
			},
		},
		{
			key: subscriptionPresentation.id,
			component: "cta",
			section: {
				id: subscriptionPresentation.id,
				...subscriptionPresentation.settings,
			},
			props: {
				template: "subscription",
				data: {
					id: subscriptionPresentation.id,
					title: subscriptionPresentation.title,
					description: subscriptionPresentation.description,
					image: subscriptionPresentation.image,
					form: subscriptionPresentation.form,
				},
			},
		},
	];

	const navigationItems = [
		...(previousEntry
			? [
					{
						title: previousEntry.title,
						href: previousEntry.href,
						image: previousEntry.cover.src,
						alt: previousEntry.cover.alt,
						label: "Previous",
						icon: "arrowLeft" as const,
						summary: previousEntry.summary,
					},
				]
			: []),
		...(nextEntry
			? [
					{
						title: nextEntry.title,
						href: nextEntry.href,
						image: nextEntry.cover.src,
						alt: nextEntry.cover.alt,
						label: "Next",
						icon: "arrowRight" as const,
						summary: nextEntry.summary,
					},
				]
			: []),
	];

	if (navigationItems.length > 0) {
		regions.push({
			key: "publication-post-navigation",
			component: "post-navigation",
			section: {
				id: "publication-post-navigation",
				theme: "canvas",
				spacing: "closing",
				container: "site",
			},
			props: {
				template: "split",
				label: "Previous / Next",
				items: navigationItems,
			},
		});
	}

	return {
		entry,
		pageTemplate: presentation.page.template,
		regions,
	};
}
