import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface LabsPageData {
	metadata: {
		title: string;
		description: string;
	};
	builder: PageBuilderConfig;
}

export interface LabsPageProps {
	data: LabsPageData;
}
