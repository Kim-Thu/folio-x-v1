import type { ContentSection } from "@/types/content/ContentSection";
import type { TaxonomyTerm } from "@/types/content/TaxonomyTerm";
import type { PageSectionData } from "@/types/components/pages/builder/PageBuilder.types";

export interface LabImage {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export interface Lab {
	order: number;
	slug: string;
	href: string;
	title: string;
	category: TaxonomyTerm;
	status: "experiment" | "in-progress" | "complete";
	statusLabel: string;
	summary: string;
	image: LabImage;
	technologies: TaxonomyTerm[];
	stars: number;
	forks: number;
	updatedLabel: string;
	liveUrl?: string;
	sourceUrl?: string;
	sections: ContentSection[];
	features: Array<{
		title: string;
		description: string;
		icon: "lightBulb" | "bolt" | "globeAlt" | "arrowPath";
	}>;
	gallery: LabImage[];
	resources: Array<{
		title: string;
		description: string;
		href: string;
		icon: "folder01" | "github" | "play";
	}>;
	facts: Array<{ label: string; value: string }>;
	detail?: {
		page: {
			template: "fluid" | "contained" | "boxed" | "sidebar" | "centered";
			sections: PageSectionData[];
		};
	};
}
