import type { HTMLAttributes } from "astro/types";

export type CProgressTone = "brand" | "rating";
export type CProgressRadius = "none" | "full";

export interface CProgressProps
	extends Omit<HTMLAttributes<"progress">, "class" | "max" | "value"> {
	class?: string;
	animated?: boolean;
	label: string;
	max?: number;
	radius?: CProgressRadius;
	tone?: CProgressTone;
	value: number;
}
