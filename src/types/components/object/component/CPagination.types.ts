import type { HTMLAttributes } from "astro/types";

export interface CPaginationProps
	extends Omit<HTMLAttributes<"nav">, "class"> {
	class?: string;
	label: string;
	previousLabel: string;
	nextLabel: string;
	totalPages: number;
}
