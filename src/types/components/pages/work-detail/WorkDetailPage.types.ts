import type { Project } from "@/types/content";

export interface WorkDetailPageData {
	project: Project;
	previous?: Project;
	next?: Project;
}

export interface WorkDetailPageProps {
	data: WorkDetailPageData;
}
