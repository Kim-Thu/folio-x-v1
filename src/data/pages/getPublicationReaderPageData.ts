import { getPublications } from "@/data/cms";
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
	const entries = await getPublications(catalogSlug);
	const entry = entries.find((item) => item.slug === entrySlug);
	if (!entry) throw new Error(`Missing publication: ${catalogSlug}/${entrySlug}`);

	const chapter = Number.parseInt(chapterParam, 10);
	if (!Number.isInteger(chapter) || chapter < 1) {
		throw new Error(`Invalid chapter: ${chapterParam}`);
	}
	if (!(entry.detail?.reader ?? []).some((item) => item.number === chapter)) {
		throw new Error(`Missing CMS reader chapter: ${catalogSlug}/${entrySlug}/${chapter}`);
	}

	return {
		entry,
		catalogSlug,
		chapter,
	};
}
