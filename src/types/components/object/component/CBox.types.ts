import type { HTMLAttributes } from "astro/types";
import type { CMediaRatio } from "@/types/components/object/component/CMedia.types";

export type CBoxElement =
	| "article"
	| "aside"
	| "div"
	| "footer"
	| "form"
	| "header"
	| "section";
export type CBoxSurface = "plain" | "accent" | "bordered" | "canvas" | "dark" | "glass" | "glass-dark" | "soft";
export type CBoxRadius = "none" | "md" | "lg";
export type CBoxSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type CBoxPosition =
	| "flow"
	| "relative"
	| "viewport"
	| "overlay"
	| "overlay-start"
	| "overlay-end"
	| "overlay-bottom";
export type CBoxOverflow = "visible" | "hidden";
export type CBoxVisibility = "all" | "desktop" | "mobile";

export interface CBoxProps extends Omit<HTMLAttributes<"div">, "class"> {
	as?: CBoxElement;
	class?: string;
	overflow?: CBoxOverflow;
	position?: CBoxPosition;
	ratio?: CMediaRatio;
	radius?: CBoxRadius;
	spacing?: CBoxSpacing;
	surface?: CBoxSurface;
	visibility?: CBoxVisibility;
}
