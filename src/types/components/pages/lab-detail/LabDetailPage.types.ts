import type { CollectionEntry } from "astro:content";

import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { PPageHeaderMediaAsideData } from "@/types/components/object/project/page-header/PPageHeader.types";
import type { Lab } from "@/types/content/Lab";

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

export interface LabDetailGalleryItemData {
	href: string;
	ariaLabel: string;
	title: string;
	image: CImageData;
}

export interface LabDetailResourceData {
	title: string;
	description: string;
	href: string;
	icon: CIconName;
	actionLabel: string;
}

export interface LabDetailRelatedData {
	href: string;
	ariaLabel: string;
	title: string;
	summary: string;
	image: CImageData;
	category: { label: string; href: string };
	stars: string;
}

export interface LabDetailPageData {
	lab: Lab;
	presentation: CollectionEntry<"labDetailSettings">["data"];
	header: PPageHeaderMediaAsideData;
	tabs: LabDetailTabData[];
	sidebar: LabDetailSidebarData;
	galleryItems: LabDetailGalleryItemData[];
	resources: LabDetailResourceData[];
	relatedItems: LabDetailRelatedData[];
}

export interface LabDetailPageProps {
	data: LabDetailPageData;
}
