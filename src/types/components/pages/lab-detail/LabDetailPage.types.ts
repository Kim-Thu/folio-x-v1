import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface LabDetailPageData {
	lab: {
		title: string;
		summary: string;
	};
	builder: PageBuilderConfig;
}

export interface LabDetailPageProps {
	data: LabDetailPageData;
}
