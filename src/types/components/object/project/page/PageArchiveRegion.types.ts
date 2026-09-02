import type { LSidebarPosition } from "@/types/components/layout/LSidebar.types";
import type { CPaginationProps } from "@/types/components/object/component/CPagination.types";
import type { PAdvertisementProps } from "@/types/components/object/project/advertisement/PAdvertisement.types";
import type { PArchiveToolbarProps } from "@/types/components/object/project/archive-toolbar/PArchiveToolbar.types";
import type { PCardProps } from "@/types/components/object/project/card/PCard.types";
import type { PFilterPanelProps } from "@/types/components/object/project/filter-panel/PFilterPanel.types";
import type { PSectionHeaderProps } from "@/types/components/object/project/section-header/PSectionHeader.types";
import type { PageRegionBase } from "@/types/components/object/project/page/PageRegion.types";

export interface PageArchiveRegion extends PageRegionBase {
	component: "archive";
	props: {
		mode: "taxonomy" | "faceted";
		toolbar: PArchiveToolbarProps;
		sidebar?: {
			label: string;
			mobilePosition?: LSidebarPosition;
			filter: PFilterPanelProps;
			advertisement?: PAdvertisementProps;
			cards?: PCardProps;
			cardsHeader?: PSectionHeaderProps;
		};
		result?: {
			header?: PSectionHeaderProps;
			count?: number;
			label?: string;
		};
		cards: PCardProps;
		emptyLabel: string;
		pagination: CPaginationProps & {
			pageSize: number;
		};
	};
}
