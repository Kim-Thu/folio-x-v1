import type { Insight } from "@/types/content";

export interface InsightDetailPageData {
	post: Insight;
	relatedPosts: Insight[];
}

export interface InsightDetailPageProps {
	data: InsightDetailPageData;
}
