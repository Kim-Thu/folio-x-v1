import type { HTMLAttributes } from "astro/types";

export interface LPageProps extends Omit<HTMLAttributes<"main">, "class"> {
	class?: string;
}
