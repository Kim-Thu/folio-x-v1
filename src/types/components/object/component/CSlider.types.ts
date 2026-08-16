import type { HTMLAttributes } from "astro/types";

export type CSliderControls = "overlay" | "below" | "below-left" | "dots";
export type CSliderGap = "none" | "sm" | "md" | "lg" | "xl";
export type CSliderShape = "none" | "card";

export interface CSliderProps
	extends Omit<HTMLAttributes<"div">, "class"> {
	class?: string;
	controls?: CSliderControls;
	gap?: CSliderGap;
	shape?: CSliderShape;
	itemCount: number;
	label: string;
	previousLabel: string;
	nextLabel: string;
}
