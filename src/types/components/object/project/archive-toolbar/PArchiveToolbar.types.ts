import type { CSearchFieldProps } from "@/types/components/object/component/CSearchField.types";
import type { CSelectOption } from "@/types/components/object/component/CSelect.types";

export type PArchiveToolbarSelectVisibility = "all" | "mobile";

export interface PArchiveToolbarData {
	filter?: {
		label: string;
		activeValue: string;
		tabs: Array<{ label: string; value: string }>;
	};
	search?: Omit<CSearchFieldProps, "class">;
	selects?: Array<{
		control: string;
		id: string;
		label: string;
		options: CSelectOption[];
		value?: string;
		visibility?: PArchiveToolbarSelectVisibility;
	}>;
	sort: {
		label: string;
		options: CSelectOption[];
		value?: string;
	};
	view: {
		label: string;
		gridLabel: string;
		listLabel: string;
	};
}

export interface PArchiveToolbarProps {
	data: PArchiveToolbarData;
}
