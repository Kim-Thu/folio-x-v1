import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface CatalogPageData {
	metadata: {
		title: string;
		description: string;
	};
	builder: PageBuilderConfig;
}

export interface CatalogPageProps {
	data: CatalogPageData;
}
