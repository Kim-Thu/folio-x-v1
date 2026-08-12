import { getPublicationDetailSettings, getPublications } from "@/data/cms";
import type { PublicationDetailPageData } from "@/types/components/pages/publication-detail/PublicationDetailPage.types";

export type PublicationCollection = "comics" | "novels";

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

	return {
		entry,
		collection,
		presentation,
	};
}
