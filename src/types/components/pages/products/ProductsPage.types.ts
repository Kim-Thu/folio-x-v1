import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface ProductsPageData {
	metadata: {
		title: string;
		description: string;
	};
	builder: PageBuilderConfig;
}

export interface ProductsPageProps {
	data: ProductsPageData;
}
