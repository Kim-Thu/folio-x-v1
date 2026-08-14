import type { PageRegion } from "@/types/components/object/project/layout/PLayout.types";

export type PPageTemplate =
	| "default"
	| "archive"
	| "catalog"
	| "work-detail"
	| "insight-detail"
	| "lab-detail"
	| "product-detail"
	| "publication-detail"
	| "reader"
	| "policy"
	| "system-state";

export interface PPageProps {
	template: PPageTemplate;
	regions: PageRegion[];
}

export interface PPageTemplateProps {
	regions: PageRegion[];
}
