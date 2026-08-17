import type { HTMLAttributes } from "astro/types";

export type CSliderControls = "overlay" | "below" | "below-left" | "dots";
export type CSliderGap = "none" | "sm" | "md" | "lg" | "xl";
export type CSliderShape = "none" | "card";

export interface CSliderBehavior {
	autoplay?: boolean;
	autoplayInterval?: number;
	draggable?: boolean;
	loop?: boolean;
	pauseOnHover?: boolean;
}

export interface CSliderProps
	extends Omit<HTMLAttributes<"div">, "class" | "draggable">,
		CSliderBehavior {
	class?: string;
	controls?: CSliderControls;
	gap?: CSliderGap;
	shape?: CSliderShape;
	itemCount: number;
	label: string;
	previousLabel: string;
	nextLabel: string;
}
