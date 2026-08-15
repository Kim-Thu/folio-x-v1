import type { CollectionEntry } from "astro:content";
import type { PageRegion } from "@/types/components/pages/builder/PageRegion.types";
import type { PPageTemplate } from "@/types/components/object/project/page/PPage.types";

export type PageEntryData = CollectionEntry<"pages">["data"];
export type PageSectionData = PageEntryData["content"]["sections"][number];

export interface PageBuilderContext {
	categorySlug?: string;
	tagSlug?: string;
	technologySlug?: string;
}

export interface ResolvedPageData {
	pageTemplate: PPageTemplate;
	regions: PageRegion[];
}

export type PageBuilderProps =
	| { page: PageEntryData; context?: PageBuilderContext }
	| ResolvedPageData;
