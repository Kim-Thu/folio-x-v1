import type { CButtonLinkProps } from "@/types/components/object/component/CButton.types";
import type { CTabListProps } from "@/types/components/object/component/CTabList.types";
import type { PCardProps } from "@/types/components/object/project/card/PCard.types";
import type { PSectionHeaderProps } from "@/types/components/object/project/section-header/PSectionHeader.types";
import type { PStatementProps } from "@/types/components/object/project/statement/PStatement.types";
import type { PageRegionBase } from "@/types/components/pages/builder/PageRegion.types";

export interface PageCollectionRegion extends PageRegionBase {
	component: "collection";
	props: {
		template?: "stack" | "split";
		header?: PSectionHeaderProps;
		tabs?: CTabListProps;
		cardGroups: PCardProps[];
		action?: CButtonLinkProps;
		statement?: PStatementProps;
		behavior?: "tabbed";
	};
}
