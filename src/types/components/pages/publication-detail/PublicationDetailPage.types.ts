import type { PublicationEntry } from "@/types/content";
import type { PublicationCollection } from "@/data/pages/getPublicationDetailPageData";

export interface PublicationDetailPageData {
	entry: PublicationEntry;
	collection: PublicationCollection;
}

export interface PublicationDetailPageProps {
	data: PublicationDetailPageData;
}
