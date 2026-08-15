import type {
	CColumnsGap,
	CColumnsTemplate,
} from "@/types/components/object/component/CColumns.types";
import type { PArchiveToolbarProps } from "@/types/components/object/project/archive-toolbar/PArchiveToolbar.types";
import type { PageRegion, PageRegionBase } from "@/types/components/pages/builder/PageRegion.types";

export interface PageGroupRegion extends PageRegionBase {
	component: "group";
	props: {
		template: "sidebar";
		asideLabel: string;
		asideColumns?: CColumnsTemplate;
		asideGap?: CColumnsGap;
		asidePosition?: "start" | "end";
		columns?: CColumnsTemplate;
		gap?: CColumnsGap;
		panel?: boolean;
		stickyAside?: boolean;
		toolbar?: PArchiveToolbarProps;
		regions: PageRegion[];
	};
}
