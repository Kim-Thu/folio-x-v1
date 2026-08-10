import type { HTMLAttributes } from "astro/types";

export interface CSearchFieldProps
	extends Omit<HTMLAttributes<"input">, "class" | "id" | "type"> {
	class?: string;
	id: string;
	label: string;
	name: string;
	placeholder: string;
}
