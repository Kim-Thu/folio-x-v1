import type {
	CBadgeAppearance,
	CBadgePlacement,
	CBadgeTone,
} from "@/types/components/object/component/CBadge.types";

export const badgeBaseClasses =
	"inline-flex w-fit items-center rounded-md px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider";

export const badgeAppearanceToneClasses: Record<
	CBadgeAppearance,
	Record<CBadgeTone, string>
> = {
	solid: {
		brand: "bg-blue-600/10 text-blue-600",
		neutral: "bg-gray-50 text-gray-500",
		inverse: "bg-white/10 text-white",
	},
	outline: {
		brand: "bg-transparent text-blue-600 ring-1 ring-inset ring-blue-600/40",
		neutral: "bg-transparent text-gray-600 ring-1 ring-inset ring-gray-300",
		inverse: "bg-transparent text-white ring-1 ring-inset ring-white/60",
	},
};

export const badgePlacementClasses: Record<CBadgePlacement, string> = {
	flow: "",
	"top-end": "absolute right-3 top-3 z-20",
};
