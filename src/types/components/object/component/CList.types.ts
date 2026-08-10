import type { HTMLAttributes } from "astro/types";

export type CListElement = "ul" | "ol";
export type CListDirection = "row" | "column";
export type CListGap = "none" | "xs" | "sm" | "md" | "lg";

export interface CListProps extends Omit<HTMLAttributes<"ul">, "class"> {
	class?: string;
	as?: CListElement;
	direction?: CListDirection;
	gap?: CListGap;
}
