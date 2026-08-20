import type {
	CBadgeAppearance,
	CBadgePlacement,
	CBadgeTone,
} from "@/types/components/object/component/CBadge.types";

export const badgeBaseClasses =
	"inline-flex w-fit items-center rounded-md px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider";

const badgeLightOutlineClasses =
	"bg-white/80 text-black ring-1 ring-inset ring-gray-100 backdrop-blur-sm";

const badgeDarkOutlineClasses =
	"bg-black/18 text-white ring-1 ring-inset ring-gray-10/12 backdrop-blur-sm";

export const badgeAppearanceToneClasses: Record<
	CBadgeAppearance,
	Record<CBadgeTone, string>
> = {
	solid: {
		brand: badgeLightOutlineClasses,
		neutral: badgeLightOutlineClasses,
		inverse: badgeDarkOutlineClasses,
	},
	outline: {
		brand: badgeLightOutlineClasses,
		neutral: badgeLightOutlineClasses,
		inverse: badgeDarkOutlineClasses,
	},
};

export const badgePlacementClasses: Record<CBadgePlacement, string> = {
	flow: "",
	"top-end": "absolute right-3 top-3 z-20",
};
