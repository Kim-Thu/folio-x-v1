import type { HTMLAttributes } from "astro/types";

export interface CSelectOption {
	label: string;
	value: string;
	href?: string;
}

export type CSelectAppearance = "pill" | "panel";

export interface CSelectProps
	extends Omit<HTMLAttributes<"select">, "class" | "id" | "multiple" | "size"> {
	class?: string;
	appearance?: CSelectAppearance;
	id: string;
	label: string;
	options: CSelectOption[];
	value?: string;
}
