import type {
	CColumnsAlign,
	CColumnsGap,
	CColumnsScrollMargin,
	CColumnsSeparator,
	CColumnsTemplate,
} from "@/types/components/object/component/CColumns.types";

export const columnsBaseClasses = "grid";

export const columnsAlignClasses: Record<CColumnsAlign, string> = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	stretch: "items-stretch",
};

export const columnsScrollMarginClasses: Record<CColumnsScrollMargin, string> =
	{
		none: "",
		header: "scroll-mt-24",
	};

export const columnsTemplateClasses: Record<CColumnsTemplate, string> = {
	one: "grid-cols-1",
	two: "grid-cols-1 md:grid-cols-2",
	three: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
	four: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
	five: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
	"compact-three": "grid-cols-2 sm:grid-cols-3",
	twelve: "grid-cols-1 lg:grid-cols-12",
};

export const columnsSeparatorClasses: Record<CColumnsSeparator, string> = {
	none: "",
	light: "",
	dark: "",
};

export const columnsGapClasses: Record<CColumnsGap, string> = {
	none: "gap-0",
	xs: "gap-1",
	sm: "gap-4",
	md: "gap-8",
	lg: "gap-8 lg:gap-12",
	xl: "gap-12 lg:gap-16",
};
