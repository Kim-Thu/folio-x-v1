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

export const pCardSliderItemClasses: Record<PCardColumns, string> = {
	1: "basis-full shrink-0 snap-start",
	2: "basis-5/6 shrink-0 snap-start sm:basis-1/2",
	3: "basis-5/6 shrink-0 snap-start sm:basis-1/2 lg:basis-1/3",
	4: "basis-5/6 shrink-0 snap-start sm:basis-1/2 lg:basis-1/4",
	5: "basis-5/6 shrink-0 snap-start sm:basis-1/2 lg:basis-1/5",
};
