import type { HTMLAttributes } from "astro/types";

export interface LFooterRevealProps extends Omit<HTMLAttributes<"div">, "class"> {
	class?: string;
	tone?: "dark" | "light";
}
