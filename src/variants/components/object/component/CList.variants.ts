import type {
	CListDirection,
	CListGap,
} from "@/types/components/object/component/CList.types";

export const listBaseClasses = "m-0 list-none p-0";

export const listDirectionClasses: Record<CListDirection, string> = {
	row: "flex flex-wrap items-center",
	column: "flex flex-col",
};

export const listGapClasses: Record<CListGap, string> = {
	none: "gap-0",
	xs: "gap-1",
	sm: "gap-2",
	md: "gap-4",
	lg: "gap-6",
};
