import type { CollectionEntry } from "astro:content";
import type { PageBuilderContext } from "@/types/components/pages/builder/PageBuilder.types";

export interface ProductsPageData {
	page: CollectionEntry<"pages">["data"];
	context: PageBuilderContext;
}

export interface ProductsPageProps {
	data: ProductsPageData;
}
