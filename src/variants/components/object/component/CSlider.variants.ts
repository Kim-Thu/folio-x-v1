import type {
	CSliderControls,
	CSliderGap,
	CSliderShape,
} from "@/types/components/object/component/CSlider.types";

export const sliderBaseClasses = "relative min-w-0";

export const sliderViewportClasses = "overflow-hidden";

export const sliderContainerClasses =
	"min-w-0 touch-pan-y touch-pinch-zoom";

export const sliderViewportDraggableClasses =
	"cursor-grab select-none active:cursor-grabbing";

export const sliderContainerGapClasses: Record<CSliderGap, string> = {
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
	none: "",
	overlay:
		"pointer-events-none absolute inset-x-4 top-1/2 z-20 -translate-y-1/2 [&>div]:w-full [&>div]:justify-between [&>div>button]:pointer-events-auto",
	below: "mt-4 flex items-center gap-4",
	"below-left": "mt-8 flex items-center",
	dots: "absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2",
};

export const sliderDotsClasses = "flex items-center gap-2";

export const sliderDotClasses =
	"size-2 cursor-pointer rounded-full bg-white/60 transition-colors duration-300 hover:bg-white data-[current=true]:bg-blue-600";

export const sliderStatusClasses =
	"flex min-w-0 flex-1 items-center gap-3 font-mono text-xs text-gray-500";

export const sliderTrackClasses =
	"h-px min-w-8 flex-1 bg-gray-100";

export const sliderButtonsClasses = "flex items-center gap-2";

export const sliderBelowLeftButtonsClasses =
	"inline-flex items-center gap-1 rounded-full bg-blue-50 p-1";

export const sliderBelowLeftPreviousClasses =
	"text-blue-600 hover:bg-blue-100 disabled:text-blue-300";
