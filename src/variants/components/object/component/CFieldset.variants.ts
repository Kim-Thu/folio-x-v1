import type { CFieldsetGap } from "@/types/components/object/component/CFieldset.types";

export const fieldsetClasses =
	"relative m-0 p-0 pb-6 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gray-100 last:pb-0 last:after:hidden";

export const fieldsetLegendClasses =
	"mb-4 p-0 font-mono text-xs font-semibold uppercase tracking-widest text-black";

export const fieldsetContentClasses = "flex flex-col";

export const fieldsetGapClasses: Record<CFieldsetGap, string> = {
	xs: "gap-2",
	sm: "gap-3",
	md: "gap-4",
};
