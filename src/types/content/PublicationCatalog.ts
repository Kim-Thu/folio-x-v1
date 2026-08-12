import type { publicationEntrySchema } from "@/content/publication-schema";
import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { z } from "astro/zod";

export type PublicationEntry = z.infer<typeof publicationEntrySchema>;
export type PublicationChapterContent = PublicationEntry["detail"]["reader"] extends Array<infer Chapter> ? Chapter : never;

export type PublicationIcon = "archiveBox" | "bolt" | "folder01" | "globeAlt" | "lightBulb" | "star" | "userCircle";
export interface PublicationImage extends CImageData {}
export interface PublicationGenre { label: string; slug: string; count: number; icon: PublicationIcon; }
export interface PublicationAuthor { name: string; works: number; image: PublicationImage; }

export interface PublicationCatalog {
	order: number;
	slug: "comics" | "novels";
	label: string;
	title: string;
	accent: string;
	description: string;
	hero: PublicationImage;
	primaryAction: { label: string; href: string };
	secondaryAction: { label: string; href: string };
	quote: string;
	quoteCredit: string;
	stats: Array<{ label: string; value: string; icon: PublicationIcon }>;
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
