import type { HTMLAttributes } from "astro/types";

export type CSliderControls = "overlay" | "below" | "dots";
export type CSliderShape = "none" | "card";

export interface CSliderProps
	extends Omit<HTMLAttributes<"div">, "class"> {
	class?: string;
	controls?: CSliderControls;
	shape?: CSliderShape;
	itemCount: number;
	label: string;
	previousLabel: string;
	nextLabel: string;
}
