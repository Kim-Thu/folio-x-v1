import type { Insight } from "@/types/content";
import type { CollectionEntry } from "astro:content";

export interface InsightDetailPageData {
	post: Insight;
	relatedPosts: Insight[];
	presentation: CollectionEntry<"blogDetailSettings">["data"];
}

export interface InsightDetailPageProps {
	data: InsightDetailPageData;
}
