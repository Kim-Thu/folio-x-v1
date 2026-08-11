import type { CButtonLinkProps, CButtonProps } from "@/types/components/object/component/CButton.types";
import type { CSelectOption } from "@/types/components/object/component/CSelect.types";

export interface PEntryIndexItem {
	order: number;
	number: string;
	title: string;
	publishedAt: string;
	publishedLabel: string;
	views: string;
	href: string;
	badge?: string;
	action?: Omit<CButtonLinkProps, "href">;
}

export interface PEntryIndexProps {
	id: string;
	label: string;
	title: string;
	sort: {
		id: string;
		label: string;
		value: string;
		options: CSelectOption[];
	};
	listViewLabel: string;
	items: PEntryIndexItem[];
	visibleCount?: number;
	footerAction?: CButtonProps;
}
