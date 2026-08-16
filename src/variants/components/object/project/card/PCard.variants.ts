import type { CColumnsTemplate } from "@/types/components/object/component/CColumns.types";
import type {
	PCardColumns,
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

export const pCardSliderClasses =
	"w-[calc(100vw-(100vw-100%)/2)] max-w-none";

export const pCardSliderItemClasses: Record<PCardColumns, string> = {
	1: "w-full shrink-0 snap-start",
	2: "w-5/6 shrink-0 snap-start sm:w-1/2",
	3: "w-5/6 shrink-0 snap-start sm:w-1/2 lg:w-1/3",
	4: "w-5/6 shrink-0 snap-start sm:w-1/2 lg:w-1/3 xl:w-1/4",
	5: "w-5/6 shrink-0 snap-start sm:w-1/2 lg:w-1/3 xl:w-1/5",
};
