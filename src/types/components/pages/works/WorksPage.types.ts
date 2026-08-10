import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface WorksPageData {
	metadata: {
		title: string;
		description: string;
	};
	builder: PageBuilderConfig;
}

export interface WorksPageProps {
	data: WorksPageData;
}
