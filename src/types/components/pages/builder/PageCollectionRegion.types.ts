import type { LSidebarProps } from "@/types/components/layout/LSidebar.types";
import type { CBoxProps } from "@/types/components/object/component/CBox.types";
import type { CButtonLinkProps } from "@/types/components/object/component/CButton.types";
import type { CTabListProps } from "@/types/components/object/component/CTabList.types";
import type { PArchiveToolbarProps } from "@/types/components/object/project/archive-toolbar/PArchiveToolbar.types";
import type { PCardProps } from "@/types/components/object/project/card/PCard.types";
import type { PFilterPanelProps } from "@/types/components/object/project/filter-panel/PFilterPanel.types";
import type { PSectionHeaderProps } from "@/types/components/object/project/section-header/PSectionHeader.types";
import type { PStatementProps } from "@/types/components/object/project/statement/PStatement.types";
import type { PageRegionBase } from "@/types/components/pages/builder/PageRegion.types";

export interface PageCollectionCardGroup {
	header?: PSectionHeaderProps;
	cards: PCardProps;
	panel?: Pick<CBoxProps, "surface" | "radius" | "spacing">;
}

interface PageCollectionSharedProps {
	header?: PSectionHeaderProps;
}

interface PageCollectionStandardProps extends PageCollectionSharedProps {
	template?: "stack" | "split";
	tabs?: CTabListProps;
	cardGroups: PCardProps[];
	action?: CButtonLinkProps;
	statement?: PStatementProps;
	behavior?: "tabbed";
}

interface PageCollectionSidebarProps extends PageCollectionSharedProps {
	template: "sidebar";
	toolbar: PArchiveToolbarProps;
	sidebar: {
		layout: Pick<LSidebarProps, "label" | "position" | "sticky">;
		panel: Pick<CBoxProps, "surface" | "radius" | "spacing">;
		filter: PFilterPanelProps;
		cardGroups: PageCollectionCardGroup[];
	};
	cardGroups: PageCollectionCardGroup[];
}

export type PageCollectionRegionProps =
	| PageCollectionStandardProps
	| PageCollectionSidebarProps;

export interface PageCollectionRegion extends PageRegionBase {
	component: "collection";
	props: PageCollectionRegionProps;
}
