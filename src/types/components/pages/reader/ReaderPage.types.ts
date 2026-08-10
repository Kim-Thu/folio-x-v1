import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface ReaderPageData {
	metadata: {
		title: string;
		description: string;
	};
	builder: PageBuilderConfig;
}

export interface ReaderPageProps {
	data: ReaderPageData;
}
