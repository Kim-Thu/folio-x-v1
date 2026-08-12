import type { Lab } from "@/types/content";
import type { PCardData } from "@/types/components/object/project/card/PCard.types";
import type { PPageHeaderMediaAsideData } from "@/types/components/object/project/page-header/PPageHeader.types";
import type { CollectionEntry } from "astro:content";

export interface LabDetailTabData {
	label: string;
	value: string;
	href: string;
}

export interface LabDetailSidebarData {
	label: string;
	facts: Lab["facts"];
	technologyLabel: string;
	technologies: Array<{ label: string; href: string }>;
}

export interface LabDetailPageData {
	lab: Lab;
	presentation: CollectionEntry<"labDetailSettings">["data"];
	header: PPageHeaderMediaAsideData;
	tabs: LabDetailTabData[];
	sidebar: LabDetailSidebarData;
	galleryCards: PCardData[];
	resourceCards: PCardData[];
	relatedCards: PCardData[];
}

export interface LabDetailPageProps {
	data: LabDetailPageData;
}
