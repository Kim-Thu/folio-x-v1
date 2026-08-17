import type { CButtonLinkProps } from "@/types/components/object/component/CButton.types";

export type PSectionHeaderTemplate = "default" | "split" | "action-right";
export type PSectionHeaderAppearance = "default" | "compact" | "catalog";

export interface PSectionHeaderData {
	id?: string;
	number?: string;
	label?: string;
	title?: string | readonly string[];
	description?: string;
}

export interface PSectionHeaderProps {
	appearance?: PSectionHeaderAppearance;
	action?: CButtonLinkProps;
	data: PSectionHeaderData;
	template?: PSectionHeaderTemplate;
	headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}
