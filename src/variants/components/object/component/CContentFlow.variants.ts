import type { CContentFlowItem } from "@/types/components/object/component/CContentFlow.types";

export const contentFlowClasses = "min-w-0";

export const contentFlowSpacingClasses: Record<
	CContentFlowItem["type"],
	string
> = {
	heading: "mt-8 scroll-mt-24 first:mt-0 md:mt-10",
	paragraph: "mt-4 first:mt-0",
	image: "mt-6 first:mt-0 md:mt-8",
};
