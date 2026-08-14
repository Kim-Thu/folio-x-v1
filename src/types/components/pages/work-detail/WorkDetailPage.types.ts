import type { ResolvedPageData } from "@/types/components/pages/builder/PageBuilder.types";
import type { Project } from "@/types/content/Project";

export type WorkDetailPageData = ResolvedPageData & {
	project: Project;
};

export interface WorkDetailPageProps {
	data: WorkDetailPageData;
}
