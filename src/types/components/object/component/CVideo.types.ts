import type { HTMLAttributes } from "astro/types";

export interface CVideoProps
	extends Omit<HTMLAttributes<"video">, "class" | "src" | "title"> {
	src: string;
	title: string;
	class?: string;
}
