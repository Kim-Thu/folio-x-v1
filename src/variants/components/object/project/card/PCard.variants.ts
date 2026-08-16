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

export const cardSliderClasses = "flex snap-x snap-mandatory overflow-x-auto scroll-smooth";

export const cardSliderGapClasses: Record<PCardGap, string> = {
	none: "gap-0",
	sm: "gap-4",
	md: "gap-6",
	lg: "gap-8",
	xl: "gap-12 lg:gap-16",
};

export const cardSliderItemClasses =
	"min-w-0 shrink-0 basis-5/6 snap-start sm:basis-1/2 lg:basis-1/3 xl:basis-1/4";
