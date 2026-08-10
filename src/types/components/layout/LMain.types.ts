import type { HTMLAttributes } from "astro/types";

export interface LMainProps extends Omit<HTMLAttributes<"main">, "class"> {
	class?: string;
}
