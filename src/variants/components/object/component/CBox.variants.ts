import type {
	CBoxOverflow,
	CBoxPosition,
	CBoxRadius,
	CBoxSpacing,
	CBoxSurface,
	CBoxVisibility,
} from "@/types/components/object/component/CBox.types";
import type { CMediaRatio } from "@/types/components/object/component/CMedia.types";

export const boxBaseClasses = "min-w-0";

export const boxRatioClasses: Record<CMediaRatio, string> = {
	editorial: "aspect-video",
	landscape: "aspect-4/3",
	natural: "",
	panoramic: "aspect-3/1",
	portrait: "aspect-2/3",
	square: "aspect-square",
	video: "aspect-video",
};

export const boxSurfaceClasses: Record<CBoxSurface, string> = {
	plain: "",
	accent:
		"bg-linear-to-r from-blue-500/10 via-white to-blue-500/10 text-black ring-1 ring-inset ring-gray-100 backdrop-blur-sm",
	bordered: "bg-white ring-1 ring-inset ring-gray-100 backdrop-blur-sm",
	canvas:
		"bg-white text-black ring-1 ring-inset ring-gray-100 backdrop-blur-sm",
	dark: "bg-black text-white",
	glass: "bg-white/80 ring-1 ring-inset ring-gray-100 backdrop-blur-sm",
	"glass-dark":
		"bg-black/95 text-white ring-1 ring-inset ring-gray-100 backdrop-blur-sm",
	soft: "bg-gray-50",
};

export const boxRadiusClasses: Record<CBoxRadius, string> = {
	none: "",
	md: "rounded-2xl",
	lg: "rounded-4xl",
};

export const boxSpacingClasses: Record<CBoxSpacing, string> = {
	none: "",
	xs: "p-4",
	sm: "px-4 py-8",
	md: "p-6",
	lg: "p-8 md:p-10",
	xl: "p-8 md:p-12",
};

export const boxPositionClasses: Record<CBoxPosition, string> = {
	flow: "",
	relative: "relative",
	viewport: "fixed inset-0 z-50",
	overlay: "absolute inset-0 z-10",
	"overlay-start":
		"relative z-10 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-1/2 lg:items-center",
	"overlay-end": "absolute bottom-4 right-4 z-10 hidden w-1/3 md:block",
	"overlay-bottom": "absolute inset-x-4 bottom-4 z-10 flex justify-center",
};

export const boxOverflowClasses: Record<CBoxOverflow, string> = {
	visible: "",
	hidden: "overflow-hidden",
};

export const boxVisibilityClasses: Record<CBoxVisibility, string> = {
	all: "",
	desktop: "hidden lg:block",
	mobile: "lg:hidden",
};
