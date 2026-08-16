import type { HTMLAttributes } from "astro/types";

export interface CDialogProps
	extends Omit<HTMLAttributes<"dialog">, "class" | "id"> {
	id: string;
	label: string;
	closeLabel: string;
	class?: string;
}
