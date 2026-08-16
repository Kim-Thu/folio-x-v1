import type { CDescriptionListVariant } from "@/types/components/object/component/CDescriptionList.types";

export const descriptionListBaseClasses = "";

export const descriptionListVariantClasses: Record<CDescriptionListVariant, string> = {
	default: "flex flex-col gap-6",
	panel:
		"flex flex-col gap-6 rounded-2xl bg-white/80 p-6 ring-1 ring-inset ring-gray-100 backdrop-blur-sm",
	facts:
		"grid grid-cols-2 gap-4 rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-gray-100 backdrop-blur-sm md:grid-cols-3 lg:grid-cols-5",
	metrics:
		"grid grid-cols-2 gap-4 md:grid-cols-4",
	highlights:
		"grid grid-cols-1 gap-4 rounded-2xl bg-gray-50 p-4 md:grid-cols-2 lg:grid-cols-4",
	compact: "flex flex-col gap-2",
};

export const descriptionListItemClasses: Record<CDescriptionListVariant, string> = {
	default: "flex flex-col gap-2",
	panel: "flex flex-col gap-2",
	facts: "flex items-center gap-3",
	metrics: "flex items-center gap-3",
	highlights: "flex items-center gap-3",
	compact: "grid grid-cols-2 items-center gap-3",
};

export const descriptionListIconClasses =
	"flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-blue-600 ring-1 ring-inset ring-gray-100";

export const descriptionListContentClasses = "flex min-w-0 flex-col gap-2";
