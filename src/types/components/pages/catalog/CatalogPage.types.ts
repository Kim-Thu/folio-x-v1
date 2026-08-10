import type { CollectionEntry } from "astro:content";

export interface CatalogPageData {
	page: CollectionEntry<"pages">["data"];
}

export interface CatalogPageProps {
	data: CatalogPageData;
}
