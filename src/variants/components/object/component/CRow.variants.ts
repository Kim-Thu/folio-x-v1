import type {
	CRowAlign,
	CRowGap,
	CRowJustify,
} from "@/types/components/object/component/CRow.types";

export const rowBaseClasses = "flex";

export const rowAlignClasses: Record<CRowAlign, string> = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	baseline: "items-baseline",
	stretch: "items-stretch",
};

export const rowJustifyClasses: Record<CRowJustify, string> = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between",
};

export const rowGapClasses: Record<CRowGap, string> = {
	none: "gap-0",
	xs: "gap-1",
	sm: "gap-2",
	md: "gap-4",
	lg: "gap-6",
};

export const rowWrapClasses: Record<`${boolean}`, string> = {
	true: "flex-wrap",
	false: "flex-nowrap",
};
