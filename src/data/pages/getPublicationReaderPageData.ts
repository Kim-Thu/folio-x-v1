import { getPublications } from "@/data/cms";
import type { ReaderPageData } from "@/types/components/pages/reader/ReaderPage.types";
import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";
import type { PReaderContent } from "@/types/components/object/project/reader/PReader.types";
import type { PublicationEntry } from "@/types/content";

type CatalogSlug = "comics" | "novels";

const catalogLabel = (catalogSlug: CatalogSlug) =>
	catalogSlug === "novels" ? "Novels" : "Comics";

export async function getPublicationReaderPaths(catalogSlug: CatalogSlug) {
	const entries = await getPublications(catalogSlug);
	return entries.flatMap((entry) =>
		Array.from({ length: entry.chapters }, (_, index) => ({
			params: { slug: entry.slug, chapter: String(index + 1) },
		})),
	);
}

export async function getPublicationReaderPageData(
	catalogSlug: CatalogSlug,
	entrySlug: string,
	chapterParam: string,
): Promise<ReaderPageData> {
	const entries = await getPublications(catalogSlug);
	const entry = entries.find((item) => item.slug === entrySlug);
	if (!entry) throw new Error(`Missing publication: ${catalogSlug}/${entrySlug}`);

	const chapter = Number.parseInt(chapterParam, 10);
	if (!Number.isInteger(chapter) || chapter < 1 || chapter > entry.chapters) {
		throw new Error(`Invalid chapter: ${chapterParam}`);
	}

	const configuredChapter = entry.detail?.reader?.find((item) => item.number === chapter);
	const title = configuredChapter?.title ?? getChapterTitle(entry, chapter);
	const content = getReaderContent(catalogSlug, entry, configuredChapter);
	const indexHref = `/${catalogSlug}/${entry.slug}#chapters`;
	const previous = chapter > 1 ? chapter - 1 : undefined;
	const next = chapter < entry.chapters ? chapter + 1 : undefined;
	const chapterHref = (number: number) => `/${catalogSlug}/${entry.slug}/chapter/${number}`;

	const builder: PageBuilderConfig = {
		layout: { template: "fluid" },
		regions: [
			{
				key: "reader",
				component: "reader",
				placement: "main",
				section: { theme: "canvas", spacing: "compact", container: "site" },
				props: {
					data: {
						breadcrumb: {
							label: "Breadcrumb",
							items: [
								{ label: catalogLabel(catalogSlug), href: `/${catalogSlug}` },
								{ label: entry.title, href: `/${catalogSlug}/${entry.slug}` },
							],
							current: `Chapter ${chapter}`,
						},
						badge: `Chapter ${chapter}`,
						title,
						metadata: {
							items: [
								{ type: "datetime", label: configuredChapter?.publishedLabel ?? "30 Apr, 2024", datetime: configuredChapter?.publishedAt ?? "2024-04-30", icon: "calendar03", display: "icon-text" },
								{ type: "reading-time", label: configuredChapter?.readTime ?? (catalogSlug === "novels" ? "12 min read" : "24 panels"), icon: "clock01", display: "icon-text" },
							],
						},
						views: `${configuredChapter?.views ?? "18.7K"} views`,
						content,
						actions: {
							label: "Reading controls",
							index: { label: "Chapter list", href: indexHref, icon: "listView", variant: "outline", size: "md" },
							settingsLabel: "Change text size",
							themeLabel: "Toggle reading theme",
							next: next ? { label: "Next chapter", href: chapterHref(next), icon: "arrowRight", iconPosition: "end", variant: "primary", size: "md" } : undefined,
						},
						share: {
							label: "Share this chapter",
							links: [
								{ label: "Share on Twitter", href: "#share-twitter", icon: "twitter" },
								{ label: "Share on Facebook", href: "#share-facebook", icon: "facebook" },
								{ label: "Copy link", href: "#share-link", icon: "link" },
							],
						},
						reactions: {
							label: "Rate this chapter",
							items: [
								{ label: "Like", count: "1.2K", icon: "handThumbUp" },
								{ label: "Love", count: "862", icon: "heart" },
								{ label: "Surprised", count: "124", icon: "faceSmile" },
								{ label: "Sad", count: "32", icon: "faceFrown" },
							],
						},
						bookmarkLabel: "Bookmark chapter",
						navigation: {
							label: "Chapter navigation",
							previous: previous ? { label: "Previous chapter", href: chapterHref(previous), icon: "arrowLeft", variant: "outline", size: "md" } : undefined,
							index: { label: "Chapter list", href: indexHref, icon: "listView", variant: "outline", size: "md" },
							next: next ? { label: "Next chapter", href: chapterHref(next), icon: "arrowRight", iconPosition: "end", variant: "primary", size: "md" } : undefined,
						},
					},
				},
			},
		],
	};

	return {
		metadata: { title: `${title} | ${entry.title}`, description: entry.summary },
		builder,
	};
}

function getChapterTitle(entry: PublicationEntry, chapter: number) {
	const index = entry.chapters - chapter;
	return entry.detail?.chapterTitles[index] ?? `Chapter ${chapter}: ${entry.title}`;
}

function getReaderContent(
	catalogSlug: CatalogSlug,
	entry: PublicationEntry,
	configured?: NonNullable<NonNullable<PublicationEntry["detail"]>["reader"]>[number],
): PReaderContent {
	if (configured?.kind === "prose" && configured.prose?.length) {
		return { kind: "prose", items: configured.prose };
	}
	if (configured?.kind === "sequential-media" && configured.images?.length) {
		return { kind: "sequential-media", images: configured.images };
	}
	if (catalogSlug === "comics") {
		return { kind: "sequential-media", images: [entry.cover] };
	}

	const [opening, direction = opening] = entry.detail?.description ?? [entry.summary];
	return {
		kind: "prose",
		items: [
			{ text: opening },
			{ text: direction },
		],
	};
}
