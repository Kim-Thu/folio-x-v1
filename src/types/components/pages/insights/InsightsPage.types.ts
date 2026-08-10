import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface InsightsPageData {
	metadata: {
		description: string;
		title: string;
	};
	builder: PageBuilderConfig;
}

export interface InsightsPageProps {
	data: InsightsPageData;
}
