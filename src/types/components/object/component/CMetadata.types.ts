import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { CListGap } from "@/types/components/object/component/CList.types";
import type { HTMLAttributes } from "astro/types";

export type CMetadataItemType =
	| "author"
	| "category"
	| "datetime"
	| "index"
	| "reading-time";

export type CMetadataItemDisplay = "icon" | "icon-text" | "text";

export interface CMetadataItem {
	type: CMetadataItemType;
	label: string;
	datetime?: string;
	display?: CMetadataItemDisplay;
	href?: string;
	icon?: CIconName;
}

export interface CMetadataData {
	items: readonly CMetadataItem[];
	separator?: string;
}

export interface CMetadataSlots {
	author: boolean;
	category: boolean;
	datetime: boolean;
	icons: boolean;
	index: boolean;
	readingTime: boolean;
}

export type CMetadataSlotOptions = Partial<CMetadataSlots>;
export type CMetadataTemplate = "inline" | "stacked";
export type CMetadataTone =
	| "brand"
	| "on-brand"
	| "on-dark"
	| "on-dark-subtle"
	| "on-light";
export type CMetadataSize = "caption" | "xs";
export type CMetadataAlign = "end" | "start";

export interface CMetadataProps extends Omit<HTMLAttributes<"ul">, "class"> {
	align?: CMetadataAlign;
	class?: string;
	data: CMetadataData;
	gap?: CListGap;
	size?: CMetadataSize;
	slots?: CMetadataSlotOptions;
	template?: CMetadataTemplate;
	tone?: CMetadataTone;
}

export interface CMetadataTemplateProps
	extends Omit<CMetadataProps, "data" | "slots" | "template"> {
	icons: boolean;
	items: readonly CMetadataItem[];
	separator?: string;
}
