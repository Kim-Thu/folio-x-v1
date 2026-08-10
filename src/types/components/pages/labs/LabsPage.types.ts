import type {
	PageBuilderContext,
	PageEntryData,
} from "@/types/components/pages/builder/PageBuilder.types";

export interface LabsPageData {
	page: PageEntryData;
	context: PageBuilderContext;
	metadata: {
		title: string;
		description: string;
	};
}

export interface LabsPageProps {
	data: LabsPageData;
}
