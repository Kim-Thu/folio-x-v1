import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface InsightDetailPageData {
	post: {
		excerpt: string;
		title: string;
	};
	builder: PageBuilderConfig;
}

export interface InsightDetailPageProps {
	data: InsightDetailPageData;
}
