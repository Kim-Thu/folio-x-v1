import { getPublicationDetailSettings, getPublications } from "@/data/cms";
import type { PageRegion } from "@/types/components/object/project/layout/PLayout.types";
import type { ReaderPageData } from "@/types/components/pages/reader/ReaderPage.types";

type CatalogSlug = "comics" | "novels";

export async function getPublicationReaderPaths(catalogSlug: CatalogSlug) {
	const entries = await getPublications(catalogSlug);
	return entries.flatMap((entry) =>
		(entry.detail?.reader ?? []).map((chapter) => ({
			params: { slug: entry.slug, chapter: String(chapter.number) },
		})),
	);
}

export async function getPublicationReaderPageData(
	catalogSlug: CatalogSlug,
	entrySlug: string,
	chapterParam: string,
): Promise<ReaderPageData> {
	const [entries, presentation] = await Promise.all([
		getPublications(catalogSlug),
		getPublicationDetailSettings(),
	]);
	const entry = entries.find((item) => item.slug === entrySlug);
	if (!entry) throw new Error(`Missing publication: ${catalogSlug}/${entrySlug}`);

	const chapter = Number.parseInt(chapterParam, 10);
	if (!Number.isInteger(chapter) || chapter < 1) {
		throw new Error(`Invalid chapter: ${chapterParam}`);
	}

	const configuredChapter = entry.detail?.reader?.find(
		(item) => item.number === chapter,
	);
	if (!configuredChapter) {
		throw new Error(`Missing CMS reader chapter: ${catalogSlug}/${entrySlug}/${chapter}`);
	}

	const readerPage = presentation.reader;
	const labels = readerPage.labels;
	const collectionPresentation = presentation.collections[catalogSlug];
	const basePath = collectionPresentation.basePath;
	const indexHref = `${basePath}/${entry.slug}#${presentation.chapters.id}`;
	const chapterHref = (number: number) =>
		`${basePath}/${entry.slug}/${presentation.routes.chapterSegment}/${number}`;
	const configuredChapters = [...(entry.detail?.reader ?? [])].sort(
		(a, b) => a.number - b.number,
	);
	const chapterIndex = configuredChapters.findIndex(
		(item) => item.number === chapter,
	);
	const previousChapter =
		chapterIndex > 0 ? configuredChapters[chapterIndex - 1] : undefined;
	const nextChapter =
		chapterIndex >= 0 && chapterIndex < configuredChapters.length - 1
			? configuredChapters[chapterIndex + 1]
			: undefined;

	const content =
		configuredChapter.kind === "sequential-media" && configuredChapter.images?.length
			? { kind: "sequential-media" as const, images: configuredChapter.images }
			: configuredChapter.kind === "prose" && configuredChapter.prose?.length
				? { kind: "prose" as const, items: configuredChapter.prose }
				: undefined;
	if (!content) {
		throw new Error(`Missing CMS reader content: ${catalogSlug}/${entry.slug}/${chapter}`);
	}

	const metadataItems = [
		configuredChapter.publishedLabel && configuredChapter.publishedAt
			? {
					type: "datetime" as const,
					label: configuredChapter.publishedLabel,
					datetime: configuredChapter.publishedAt,
					...readerPage.metadata.published,
				}
			: undefined,
		configuredChapter.readTime
			? {
					type: "reading-time" as const,
					label: configuredChapter.readTime,
					...readerPage.metadata.readTime,
				}
			: undefined,
	].filter((item) => item !== undefined);

	const regions: PageRegion[] = [
		{
			key: `reader-${entry.slug}-${chapter}`,
			component: "reader",
			section: readerPage.settings,
			props: {
				data: {
					breadcrumb: {
						label: labels.breadcrumb,
						items: [
							{
								label: collectionPresentation.collectionLabel,
								href: basePath,
							},
							{ label: entry.title, href: `${basePath}/${entry.slug}` },
						],
						current: `${labels.chapter} ${chapter}`,
					},
					badge: `${labels.chapter} ${chapter}`,
					title: configuredChapter.title,
					metadata: { items: metadataItems },
					views: configuredChapter.views
						? `${configuredChapter.views} ${labels.viewsSuffix}`
						: undefined,
					content,
					actions: {
						label: labels.actions,
						index: {
							label: labels.chapterList,
							href: indexHref,
							...readerPage.controls.chapterList,
						},
						settingsLabel: labels.settings,
						themeLabel: labels.theme,
						next: nextChapter
							? {
									label: labels.next,
									href: chapterHref(nextChapter.number),
									...readerPage.controls.next,
								}
							: undefined,
					},
					share: { label: labels.share, links: [] },
					reactions: { label: labels.reactions, items: [] },
					bookmarkLabel: labels.bookmark,
					navigation: {
						label: labels.navigation,
						previous: previousChapter
							? {
									label: labels.previous,
									href: chapterHref(previousChapter.number),
									...readerPage.controls.previous,
								}
							: undefined,
						index: {
							label: labels.chapterList,
							href: indexHref,
							...readerPage.controls.chapterList,
						},
						next: nextChapter
							? {
									label: labels.next,
									href: chapterHref(nextChapter.number),
									...readerPage.controls.next,
								}
							: undefined,
					},
				},
			},
		},
	];

	return {
		entry,
		pageTemplate: readerPage.template ,
		regions,
	};
}
