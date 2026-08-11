import type { CImageData } from "@/types/components/object/component/CImage.types";

export type PublicationIcon =
	| "archiveBox"
	| "bolt"
	| "folder01"
	| "globeAlt"
	| "lightBulb"
	| "star"
	| "userCircle";

export interface PublicationImage extends CImageData {}

export interface PublicationGenre {
	label: string;
	slug: string;
	count: number;
	icon: PublicationIcon;
}

export interface PublicationChapterContent {
	number: number;
	title: string;
	publishedAt: string;
	publishedLabel: string;
	readTime: string;
	views: string;
	kind: "prose" | "sequential-media";
	prose?: Array<{
		kind?: "paragraph" | "emphasis" | "separator";
		text: string;
	}>;
	images?: PublicationImage[];
}

export interface PublicationEntry {
	order: number;
	slug: string;
	title: string;
	summary: string;
	cover: PublicationImage;
	genres: Array<{ label: string; slug: string }>;
	status: "complete" | "ongoing";
	rating: number;
	views: string;
	chapters: number;
	updatedLabel: string;
	author: string;
	detail?: {
		language?: string;
		followers?: string;
		description?: string[];
		tags?: Array<{ label: string; slug: string }>;
		reader?: PublicationChapterContent[];
	};
}

export interface PublicationAuthor {
	name: string;
	works: number;
	image: PublicationImage;
}

export interface PublicationCatalog {
	order: number;
	slug: "comics" | "novels";
	label: string;
	title: string;
	accent: string;
	description: string;
	hero: PublicationImage;
	primaryAction: {
		label: string;
		href: string;
	};
	secondaryAction: {
		label: string;
		href: string;
	};
	quote: string;
	quoteCredit: string;
	stats: Array<{
		label: string;
		value: string;
		icon: PublicationIcon;
	}>;
	genres: PublicationGenre[];
	authors: PublicationAuthor[];
	entries: PublicationEntry[];
	newsletter: {
		title: string;
		description: string;
		inputLabel: string;
		placeholder: string;
		submitLabel: string;
		image: PublicationImage;
	};
}
