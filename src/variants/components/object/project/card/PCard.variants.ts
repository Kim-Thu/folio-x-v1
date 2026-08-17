import type { CColumnsTemplate } from "@/types/components/object/component/CColumns.types";
import type {
	PCardColumns,
	PCardGap,
	PCardTemplate,
} from "@/types/components/object/project/card/PCard.types";

export const pCardColumnTemplates: Record<PCardColumns, CColumnsTemplate> = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	5: "five",
};

export const pCardTemplateColumnDefaults: Partial<Record<PCardTemplate, PCardColumns>> = {
	list: 1,
	"three-column": 3,
};

export const pCardSliderItemClasses: Record<PCardColumns, string> = {
	1: "min-w-0 w-full shrink-0 snap-start",
	2: "min-w-0 w-5/6 shrink-0 snap-start sm:w-1/2",
	3: "min-w-0 w-5/6 shrink-0 snap-start sm:w-1/2 lg:w-1/3",
	4: "min-w-0 w-5/6 shrink-0 snap-start sm:w-1/2 lg:w-1/4",
	5: "min-w-0 w-5/6 shrink-0 snap-start sm:w-1/2 lg:w-1/5",
};

export const pCardSliderItemGapClasses: Record<PCardGap, string> = {
	none: "",
	sm: "pr-4",
	md: "pr-6",
	lg: "pr-8",
	xl: "pr-12 lg:pr-16",
};
