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
