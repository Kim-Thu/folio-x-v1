import type { HTMLAttributes } from "astro/types";

export type CMediaRatio =
	| "editorial"
	| "landscape"
	| "natural"
	| "panoramic"
	| "portrait"
	| "square"
	| "video";
export type CMediaSize = "auto" | "compact" | "thumbnail";
export type CMediaPlacement = "flow" | "background";
export type CMediaShape = "none" | "card" | "circle";

export interface CMediaProps
	extends Omit<HTMLAttributes<"figure">, "class"> {
	ariaLabel?: string;
	class?: string;
	href?: string;
	placement?: CMediaPlacement;
	shape?: CMediaShape;
	ratio?: CMediaRatio;
	size?: CMediaSize;
}
