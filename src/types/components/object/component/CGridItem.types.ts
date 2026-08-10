import type { HTMLAttributes } from "astro/types";

export type CGridItemElement =
	| "article"
	| "aside"
	| "div"
	| "footer"
	| "header"
	| "section"
	| "span";

export type CGridItemSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" | "full";
export type CGridItemAlign = "auto" | "center" | "end" | "start" | "stretch";

export interface CGridItemProps extends Omit<HTMLAttributes<"div">, "class"> {
	as?: CGridItemElement;
	span?: CGridItemSpan;
	mdSpan?: CGridItemSpan;
	lgSpan?: CGridItemSpan;
	align?: CGridItemAlign;
}
