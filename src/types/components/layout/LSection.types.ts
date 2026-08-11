import type { LContainerSize } from "@/types/components/layout/LContainer.types";
import type { HTMLAttributes } from "astro/types";

export type LSectionTheme = "dark" | "light" | "canvas" | "accent" | "none";
export type LSectionSpacing =
	| "compact"
	| "default"
	| "none"
	| "lead"
	| "body"
	| "closing";

export interface LSectionProps
	extends Omit<HTMLAttributes<"section">, "class"> {
	class?: string;
	theme?: LSectionTheme;
	spacing?: LSectionSpacing;
	container?: LContainerSize | "none";
}
