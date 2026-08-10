import type { CIconSize } from "@/types/components/object/component/CIcon.types";
import type {
	CSocialLinksGap,
	CSocialLinksOrientation,
	CSocialLinksShape,
} from "@/types/components/object/component/CSocialLinks.types";
import { twJoin } from "@/utils/cn";

export const socialListClasses: Record<CSocialLinksOrientation, string> = {
	horizontal: "flex flex-wrap items-center",
	vertical: "flex flex-col",
};

export const socialListGapClasses: Record<CSocialLinksGap, string> = {
	sm: "gap-3",
	md: "gap-4",
	lg: "gap-6",
	xl: "gap-8",
};

const socialLinkSizeClasses: Record<CIconSize, string> = {
	sm: "text-sm",
	md: "text-base",
	lg: "text-base",
	inline: "text-base",
};

const socialLinkShapeClasses: Record<CSocialLinksShape, string> = {
	default: "",
	circle: "rounded-full ring-1 ring-inset ring-gray-100",
	square: "rounded-lg ring-1 ring-inset ring-gray-100",
};

export function getSocialLinkClasses(
	shape: CSocialLinksShape,
	size: CIconSize,
): string {
	return twJoin(
		"inline-flex items-center justify-center text-gray-300 transition-colors hover:text-white hover:ring-gray-100",
		socialLinkShapeClasses[shape],
		socialLinkSizeClasses[size],
	);
}
