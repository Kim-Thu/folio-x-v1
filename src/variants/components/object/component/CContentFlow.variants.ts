import type { CContentFlowItem } from "@/types/components/object/component/CContentFlow.types";

export const contentFlowClasses = "min-w-0";

export const contentFlowSpacingClasses: Record<
	CContentFlowItem["type"],
	string
> = {
	heading: "mt-8 scroll-mt-24 first:mt-0 md:mt-10",
	paragraph: "mt-4 first:mt-0",
	image: "mt-6 first:mt-0 md:mt-8",
	"feature-grid": "mt-8 scroll-mt-24 first:mt-0 md:mt-10",
	list: "mt-4 first:mt-0",
	table: "mt-6 first:mt-0 md:mt-8",
	quote: "mt-6 first:mt-0 md:mt-8",
	callout: "mt-6 first:mt-0",
	code: "mt-6 first:mt-0 md:mt-8",
	divider: "my-8 first:mt-0",
	media: "mt-6 first:mt-0 md:mt-8",
	"metric-grid": "mt-8 scroll-mt-24 first:mt-0 md:mt-10",
};
