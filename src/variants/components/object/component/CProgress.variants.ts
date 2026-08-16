import type { CProgressRadius, CProgressTone } from "@/types/components/object/component/CProgress.types";

export const progressClasses = "block h-2 w-full overflow-hidden bg-gray-100";

export const progressRadiusClasses: Record<CProgressRadius, string> = {
	none: "rounded-none",
	full: "rounded-full",
};

export const progressToneClasses: Record<CProgressTone, string> = {
	brand: "fill-blue-600",
	rating: "fill-yellow-500",
};

export const progressFillToneClasses: Record<CProgressTone, string> = {
	brand: "bg-blue-600",
	rating: "bg-yellow-500",
};
