import type { HTMLAttributes } from "astro/types";

export type CImageVariant =
	| "natural"
	| "cover"
	| "fill"
	| "payment-logo"
	| "background-contain"
	| "scene-right";

export type CImagePosition = "center" | "top";

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
	position?: CImagePosition;
	class?: string;
}
