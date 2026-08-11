import type { Lab } from "@/types/content";
import type { CollectionEntry } from "astro:content";

export interface LabDetailPageData {
	lab: Lab;
	relatedLabs: Lab[];
	presentation: CollectionEntry<"labDetailSettings">["data"];
}

export interface LabDetailPageProps {
	data: LabDetailPageData;
}
