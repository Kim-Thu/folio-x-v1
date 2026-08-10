import type { CollectionEntry } from "astro:content";
import type { PageBuilderContext } from "@/types/components/pages/builder/PageBuilder.types";

export interface InsightsPageData {
	page: CollectionEntry<"pages">["data"];
	context: PageBuilderContext;
}

export interface InsightsPageProps {
	data: InsightsPageData;
}
