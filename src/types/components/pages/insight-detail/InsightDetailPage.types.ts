import type { ResolvedPageData } from "@/types/components/pages/builder/PageBuilder.types";
import type { Insight } from "@/types/content/Insight";

export type InsightDetailPageData = ResolvedPageData & {
	post: Insight;
};

export interface InsightDetailPageProps {
	data: InsightDetailPageData;
}
