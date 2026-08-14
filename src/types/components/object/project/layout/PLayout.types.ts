import type { LSidebarPosition } from "@/types/components/layout/LSidebar.types";
import type { CColumnsGap } from "@/types/components/object/component/CColumns.types";

export interface PLayoutProps {
	asideLabel: string;
	asideGap?: CColumnsGap;
	asidePosition?: LSidebarPosition;
	gap?: CColumnsGap;
	panel?: boolean;
	stickyAside?: boolean;
}
