import type { LContainerSize } from "@/types/components/layout/LContainer.types";

export const containerSizeClasses: Record<LContainerSize, string> = {
	site: "max-w-screen-2xl",
	content: "max-w-7xl",
	article: "mx-0 max-w-3xl px-0",
};
