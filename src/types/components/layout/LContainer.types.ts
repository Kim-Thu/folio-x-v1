import type { HTMLAttributes } from "astro/types";

export type LContainerSize = "fluid" | "wide" | "boxed";

export interface LContainerProps
	extends Omit<HTMLAttributes<"div">, "class"> {
	class?: string;
	size?: LContainerSize;
}
