import type { LPageTemplate } from "@/types/components/layout/LPage.types";

export const pageLayoutClasses: Record<LPageTemplate, string> = {
	fluid: "min-w-0",
	contained: "min-w-0",
	boxed: "min-w-0",
	sidebar: "min-w-0",
	centered: "grid min-w-0 items-center",
};

export const pageBoxClasses =
	"min-w-0 overflow-hidden bg-white ring-1 ring-inset ring-gray-100";
