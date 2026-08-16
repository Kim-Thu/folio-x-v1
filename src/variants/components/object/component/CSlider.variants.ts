import type {
	CSliderControls,
	CSliderShape,
} from "@/types/components/object/component/CSlider.types";

export const sliderBaseClasses = "relative min-w-0";

export const sliderViewportClasses =
	"flex snap-x snap-mandatory overflow-hidden";

export const sliderViewportShapeClasses: Record<CSliderShape, string> = {
	none: "",
	card: "rounded-2xl",
};

export const sliderControlsClasses: Record<CSliderControls, string> = {
	overlay: "absolute bottom-4 right-4 flex items-center gap-2",
	below: "mt-4 flex items-center gap-4",
	dots: "absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2",
};

export const sliderDotsClasses = "flex items-center gap-2";

export const sliderDotClasses =
	"size-2 cursor-pointer rounded-full bg-white/60 transition-colors duration-300 hover:bg-white";

export const sliderDotCurrentClasses = "bg-blue-600";

export const sliderStatusClasses =
	"flex min-w-0 flex-1 items-center gap-3 font-mono text-xs text-gray-500";

export const sliderTrackClasses =
	"h-px min-w-8 flex-1 bg-gray-100";

export const sliderButtonsClasses = "flex items-center gap-2";
