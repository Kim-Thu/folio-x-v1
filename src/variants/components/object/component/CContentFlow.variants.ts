import type { CContentFlowItem } from "@/types/components/object/component/CContentFlow.types";

export const contentFlowClasses = "min-w-0";

export const contentFlowRichTextClasses =
	"[&_strong]:font-semibold [&_b]:font-semibold [&_em]:italic [&_i]:italic [&_del]:line-through [&_s]:line-through [&_a]:font-medium [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded-md [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm";

export const contentFlowImageMediaClasses = "rounded-2xl";

export const contentFlowCaptionClasses =
	"mt-2 text-center text-sm italic leading-relaxed text-gray-500";

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
