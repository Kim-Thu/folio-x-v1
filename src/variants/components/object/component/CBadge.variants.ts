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
		brand: "bg-blue-600/10 text-blue-600 ring-1 ring-inset ring-blue-600/40",
		neutral: "bg-white/80 text-black ring-1 ring-inset ring-gray-100 backdrop-blur-sm",
		inverse: "bg-black/18 text-white ring-1 ring-inset ring-gray-10/12 backdrop-blur-sm",
	},
};

export const badgePlacementClasses: Record<CBadgePlacement, string> = {
	flow: "",
	"top-end": "absolute right-3 top-3 z-20",
};
