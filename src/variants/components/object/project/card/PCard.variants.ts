import type {
	PCardColumns,
	PCardGap,
} from "@/types/components/object/project/card/PCard.types";

export const cardSliderItemClasses: Record<PCardColumns, string> = {
	1: "w-full",
	2: "w-full md:w-1/2",
	3: "w-full md:w-1/2 lg:w-1/3",
	4: "w-full md:w-1/2 lg:w-1/4",
	5: "w-full md:w-1/2 lg:w-1/5",
};

export const cardSliderItemGapClasses: Record<PCardGap, string> = {
	none: "",
	sm: "pr-2",
	md: "pr-4",
	lg: "pr-6",
	xl: "pr-8",
};
