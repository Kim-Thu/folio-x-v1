import type { LSidebarPosition } from "@/types/components/layout/LSidebar.types";
import type {
	CColumnsGap,
	CColumnsTemplate,
} from "@/types/components/object/component/CColumns.types";

export interface PLayoutProps {
	asideLabel: string;
	asideColumns?: CColumnsTemplate;
	asideGap?: CColumnsGap;
	asidePosition?: LSidebarPosition;
	columns?: CColumnsTemplate;
	gap?: CColumnsGap;
	panel?: boolean;
	stickyAside?: boolean;
}
