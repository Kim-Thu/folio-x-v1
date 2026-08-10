import type { PageEntryData } from "@/types/components/pages/builder/PageBuilder.types";

export interface WorksPageContext {
	categorySlug?: string;
	tagSlug?: string;
}

export interface WorksPageData {
	page: PageEntryData;
	context: WorksPageContext;
	metadata: {
		title: string;
		description: string;
	};
}

export interface WorksPageProps {
	data: WorksPageData;
}
