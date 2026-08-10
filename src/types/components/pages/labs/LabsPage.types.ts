import type {
	PageBuilderContext,
	PageEntryData,
} from "@/types/components/pages/builder/PageBuilder.types";

export interface LabsPageData {
	page: PageEntryData;
	context: PageBuilderContext;
}

export interface LabsPageProps {
	data: LabsPageData;
}
