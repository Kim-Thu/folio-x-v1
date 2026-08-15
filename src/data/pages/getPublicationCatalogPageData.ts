import { getPage } from "@/data/cms";
import type { CatalogPageData } from "@/types/components/pages/catalog/CatalogPage.types";
import type { PublicationCollection } from "@/types/content/PublicationCatalog";

export async function getPublicationCatalogPageData(
	slug: PublicationCollection,
): Promise<CatalogPageData> {
	const page = await getPage(`/${slug}`);
	return { page };
}
