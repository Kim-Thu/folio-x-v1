import type { HTMLAttributes } from "astro/types";

export interface CNavigationProps
	extends Omit<HTMLAttributes<"nav">, "aria-label" | "class"> {
	class?: string;
	label: string;
}
