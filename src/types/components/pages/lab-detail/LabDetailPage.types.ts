import type { Lab } from "@/types/content";

export interface LabDetailPageData {
	lab: Lab;
	relatedLabs: Lab[];
}

export interface LabDetailPageProps {
	data: LabDetailPageData;
}
