import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface PublicationDetailPageData {
	metadata: { title: string; description: string };
	builder: PageBuilderConfig;
}

export interface PublicationDetailPageProps {
	data: PublicationDetailPageData;
}
