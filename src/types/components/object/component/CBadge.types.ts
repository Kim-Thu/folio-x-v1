import type { HTMLAttributes } from "astro/types";

export type CBadgeElement = "span" | "small";
export type CBadgeAppearance = "solid" | "outline";
export type CBadgeTone = "brand" | "neutral" | "inverse";
export type CBadgePlacement = "flow" | "top-end";

export interface CBadgeProps extends Omit<HTMLAttributes<"span">, "class"> {
	as?: CBadgeElement;
	appearance?: CBadgeAppearance;
	class?: string;
	placement?: CBadgePlacement;
	tone?: CBadgeTone;
}
