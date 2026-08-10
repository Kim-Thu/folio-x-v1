import type { PublicationEntry } from "@/types/content";

export type PublicationCollection = "comics" | "novels";

export interface PublicationDetailPageData {
	entry: PublicationEntry;
	collection: PublicationCollection;
}

export interface PublicationDetailPageProps {
	data: PublicationDetailPageData;
}
