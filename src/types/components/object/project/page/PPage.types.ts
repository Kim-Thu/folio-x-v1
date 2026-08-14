import type { PageRegion } from "@/types/components/object/project/layout/PLayout.types";

export type PPageTemplate =
	| "stacked"
	| "lead-content"
	| "lead-content-closing"
	| "lead-content-navigation"
	| "lead-navigation-content";

export interface PPageProps {
	template: PPageTemplate;
	regions: PageRegion[];
}

export interface PPageTemplateProps {
	regions: PageRegion[];
}
