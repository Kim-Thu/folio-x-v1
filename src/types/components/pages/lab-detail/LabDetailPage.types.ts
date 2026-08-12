import type { Lab } from "@/types/content";
import type { PCardData } from "@/types/components/object/project/card/PCard.types";
import type { CollectionEntry } from "astro:content";

export interface LabDetailTabData {
	label: string;
	value: string;
	href: string;
}

export interface LabDetailHeaderData {
	breadcrumb: {
		label: string;
		items: Array<{ label: string; href: string }>;
		current: string;
	};
	image: Lab["image"];
	category: { label: string; href: string };
	badge: string;
	title: string;
	description: string;
	metrics: Array<{ icon: string; label: string }>;
	actionsLabel: string;
	actions: Array<Record<string, string>>;
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
	header: LabDetailHeaderData;
	tabs: LabDetailTabData[];
	sidebar: LabDetailSidebarData;
	galleryCards: PCardData[];
	resourceCards: PCardData[];
	relatedCards: PCardData[];
}

export interface LabDetailPageProps {
	data: LabDetailPageData;
}
