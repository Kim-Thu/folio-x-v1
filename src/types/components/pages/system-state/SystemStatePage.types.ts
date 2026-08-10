import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface SystemStatePageData {
	builder: PageBuilderConfig;
}

export interface SystemStatePageProps {
	data: SystemStatePageData;
}
