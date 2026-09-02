import type {
	CSliderControls,
	CSliderGap,
	CSliderShape,
} from "@/types/components/object/component/CSlider.types";

export const sliderBaseClasses = "relative min-w-0";

export const sliderViewportClasses =
	"flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export const sliderViewportDraggableClasses =
	"cursor-grab touch-pan-y select-none active:cursor-grabbing";

export const sliderViewportGapClasses: Record<CSliderGap, string> = {
	none: "gap-0",
	sm: "gap-4",
	md: "gap-6",
	lg: "gap-8",
	xl: "gap-12 lg:gap-16",
};

export const sliderViewportShapeClasses: Record<CSliderShape, string> = {
	none: "",
	card: "rounded-2xl",
};

export const sliderControlsClasses: Record<CSliderControls, string> = {
	overlay: "absolute bottom-4 right-4 flex items-center gap-2",
	below: "mt-4 flex items-center gap-4",
	"below-left": "mt-10 flex items-center",
	dots: "absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center",
};

export const sliderDotsClasses = "flex items-center";

export const sliderDotClasses =
	"relative size-6 cursor-pointer rounded-full bg-transparent before:absolute before:left-1/2 before:top-1/2 before:size-2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white/60 before:transition-colors before:duration-300 before:content-[''] hover:before:bg-white";

export const sliderDotCurrentClasses = "before:bg-blue-600";

export const sliderStatusClasses =
	"flex min-w-0 flex-1 items-center gap-3 font-mono text-xs text-gray-500";

export const sliderTrackClasses =
	"h-px min-w-8 flex-1 bg-gray-100";

export const sliderButtonsClasses = "flex items-center gap-2";

export const sliderBelowLeftButtonsClasses =
	"inline-flex items-center gap-1 rounded-full bg-blue-50 p-1";

export const sliderBelowLeftPreviousClasses =
	"text-blue-600 hover:bg-blue-100 disabled:text-blue-300";
