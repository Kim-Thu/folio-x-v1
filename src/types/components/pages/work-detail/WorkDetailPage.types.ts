import type { Project } from "@/types/content";

export interface WorkDetailRoutes {
	base: string;
	categoryBase: string;
	tagBase: string;
}

export interface WorkDetailPageData {
	project: Project;
	previous?: Project;
	next?: Project;
	routes: WorkDetailRoutes;
}

export interface WorkDetailPageProps {
	data: WorkDetailPageData;
}
