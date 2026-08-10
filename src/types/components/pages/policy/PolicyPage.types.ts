import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface PolicyPageData {
	metadata: {
		title: string;
		description: string;
	};
	builder: PageBuilderConfig;
}

export interface PolicyPageProps {
	data: PolicyPageData;
}
