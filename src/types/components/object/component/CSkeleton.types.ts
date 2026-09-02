import type { HTMLAttributes } from "astro/types";

export type CSkeletonVariant = "line" | "media" | "block";
export type CSkeletonWidth = "full" | "medium" | "short";

export interface CSkeletonProps extends Omit<HTMLAttributes<"span">, "class"> {
	variant?: CSkeletonVariant;
	width?: CSkeletonWidth;
}
