import type { PublicationEntry } from "@/types/content";
import type { CollectionEntry } from "astro:content";

export type PublicationCollection = "comics" | "novels";

export interface PublicationDetailPageData {
	entry: PublicationEntry;
	collection: PublicationCollection;
	presentation: CollectionEntry<"publicationDetailSettings">["data"];
}

export interface PublicationDetailPageProps {
	data: PublicationDetailPageData;
}
