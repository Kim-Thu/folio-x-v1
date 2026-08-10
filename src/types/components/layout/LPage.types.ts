import type { HTMLAttributes } from "astro/types";

import type { LContainerSize } from "@/types/components/layout/LContainer.types";
import type { LSidebarPosition } from "@/types/components/layout/LSidebar.types";

export type LPageTemplate =
	| "fluid"
	| "contained"
	| "boxed"
	| "sidebar"
	| "centered";

export interface LPageProps extends Omit<HTMLAttributes<"main">, "class"> {
	class?: string;
	template?: LPageTemplate;
	containerSize?: LContainerSize;
	asideLabel?: string;
	asidePosition?: LSidebarPosition;
}
