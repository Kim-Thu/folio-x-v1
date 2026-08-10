import type { HTMLAttributes } from "astro/types";

export interface CTOCItem {
	label: string;
	href: string;
}

export type CTOCAppearance = "plain" | "panel";

export interface CTOCProps extends Omit<HTMLAttributes<"aside">, "class"> {
	appearance?: CTOCAppearance;
	class?: string;
	label: string;
	items: CTOCItem[];
	sticky?: boolean;
}
