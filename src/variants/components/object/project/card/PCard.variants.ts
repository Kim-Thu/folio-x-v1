import type {
	PCardColumns,
	PCardGap,
} from "@/types/components/object/project/card/PCard.types";

export const cardSliderItemClasses: Record<PCardColumns, string> = {
	1: "basis-full",
	2: "basis-full md:basis-1/2",
	3: "basis-full md:basis-1/2 lg:basis-1/3",
	4: "basis-full md:basis-1/2 lg:basis-1/4",
	5: "basis-full md:basis-1/2 lg:basis-1/5",
};

export const cardSliderItemGapClasses: Record<PCardGap, string> = {
	none: "",
	sm: "pr-2",
	md: "pr-4",
	lg: "pr-6",
	xl: "pr-8",
};
