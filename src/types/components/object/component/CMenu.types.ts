import type { HTMLAttributes } from "astro/types";

export interface CMenuItem {
	href: string;
	label: string;
}

export type CMenuVariant = "desktop" | "mobile" | "footer";
export type CMenuTone = "dark" | "light";

export interface CMenuProps extends Omit<HTMLAttributes<"ul">, "class"> {
	items: readonly CMenuItem[];
	tone?: CMenuTone;
	variant?: CMenuVariant;
}
