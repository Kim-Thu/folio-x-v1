import type { ResolvedPageData } from "@/types/components/pages/builder/PageBuilder.types";

export type PublicationCollection = "comics" | "novels";
export type PublicationDetailPageData = ResolvedPageData;

export interface PublicationDetailPageProps {
	data: PublicationDetailPageData;
}
