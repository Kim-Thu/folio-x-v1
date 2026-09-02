import type { HTMLAttributes } from "astro/types";

export type LSidebarPosition = "start" | "end";

export interface LSidebarProps extends Omit<HTMLAttributes<"div">, "class"> {
	class?: string;
	label: string;
	mobilePosition?: LSidebarPosition;
	position?: LSidebarPosition;
	sticky?: boolean;
}
