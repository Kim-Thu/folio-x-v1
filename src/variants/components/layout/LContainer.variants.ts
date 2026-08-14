import type { LContainerSize } from "@/types/components/layout/LContainer.types";

export const containerSizeClasses: Record<LContainerSize, string> = {
	fluid: "max-w-none",
	wide: "max-w-screen-2xl",
	boxed: "max-w-7xl",
};
