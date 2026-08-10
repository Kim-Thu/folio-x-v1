export interface CTabListItem {
	href?: string;
	label: string;
	value: string;
}

export interface CTabListProps {
	activeValue?: string;
	appearance?: "default" | "archive" | "underline";
	label?: string;
	tabs: readonly CTabListItem[];
	tone?: CButtonTone;
}
import type { CButtonTone } from "@/types/components/object/component/CButton.types";
