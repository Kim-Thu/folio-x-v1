import type { ResolvedPageData } from "@/types/components/pages/builder/PageBuilder.types";
import type { PublicationEntry } from "@/types/content/PublicationCatalog";

export type { PublicationCollection } from "@/types/content/PublicationCatalog";

export type PublicationDetailPageData = ResolvedPageData & {
	entry: PublicationEntry;
};

export interface PublicationDetailPageProps {
	data: PublicationDetailPageData;
}
