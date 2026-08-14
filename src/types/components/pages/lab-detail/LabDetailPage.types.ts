import type { ResolvedPageData } from "@/types/components/pages/builder/PageBuilder.types";
import type { Lab } from "@/types/content/Lab";

export type LabDetailPageData = ResolvedPageData & {
	lab: Lab;
};

export interface LabDetailPageProps {
	data: LabDetailPageData;
}
