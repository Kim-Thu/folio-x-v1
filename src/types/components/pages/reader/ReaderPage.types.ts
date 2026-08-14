import type { ResolvedPageData } from "@/types/components/pages/builder/PageBuilder.types";
import type { PublicationEntry } from "@/types/content/PublicationCatalog";

export type ReaderPageData = ResolvedPageData & {
	entry: PublicationEntry;
};

export interface ReaderPageProps {
	data: ReaderPageData;
}
