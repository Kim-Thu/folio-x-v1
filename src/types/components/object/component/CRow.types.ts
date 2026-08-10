import type { HTMLAttributes } from "astro/types";

export type CRowElement = "div" | "footer" | "header" | "nav" | "span";
export type CRowAlign = "start" | "center" | "end" | "baseline" | "stretch";
export type CRowJustify = "start" | "center" | "end" | "between";
export type CRowGap = "none" | "xs" | "sm" | "md" | "lg";

export interface CRowProps extends Omit<HTMLAttributes<"div">, "class"> {
	as?: CRowElement;
	align?: CRowAlign;
	justify?: CRowJustify;
	gap?: CRowGap;
	wrap?: boolean;
	class?: string;
}
