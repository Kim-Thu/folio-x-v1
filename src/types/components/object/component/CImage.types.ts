import type { HTMLAttributes } from "astro/types";

export type CImageVariant =
	| "natural"
	| "cover"
	| "fill"
	| "payment-logo"
	| "background-contain";

export interface CImageData {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export interface CImageProps extends CImageData, Omit<
	HTMLAttributes<"img">,
	"alt" | "class" | "height" | "src" | "width"
> {
	variant?: CImageVariant;
	class?: string;
}
