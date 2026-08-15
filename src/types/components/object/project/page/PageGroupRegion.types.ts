import type { CColumnsGap } from "@/types/components/object/component/CColumns.types";
import type { PArchiveToolbarProps } from "@/types/components/object/project/archive-toolbar/PArchiveToolbar.types";
import type { PageRegion, PageRegionBase } from "@/types/components/object/project/page/PageRegion.types";

export interface PageGroupRegion extends PageRegionBase {
	component: "group";
	props: {
		template: "sidebar";
		asideLabel: string;
		asideGap?: CColumnsGap;
		asidePosition?: "start" | "end";
		gap?: CColumnsGap;
		panel?: boolean;
		stickyAside?: boolean;
		toolbar?: PArchiveToolbarProps;
		regions: PageRegion[];
	};
}
