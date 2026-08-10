import { getPage } from "@/data/cms";
import type { CatalogPageData } from "@/types/components/pages/catalog/CatalogPage.types";
import type { PublicationCatalog } from "@/types/content";

type CatalogSlug = PublicationCatalog["slug"];

export async function getPublicationCatalogPageData(
	slug: CatalogSlug,
): Promise<CatalogPageData> {
	const page = await getPage(`/${slug}`);
	return { page };
}
