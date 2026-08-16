import type { CIconName } from "@/types/components/object/component/CIcon.types";

export const postNavigationItemClasses =
	"group flex min-w-0 items-center gap-4 transition-colors duration-300 hover:text-blue-600 sm:w-5/12";
export const postNavigationNextClasses = "sm:ml-auto sm:flex-row-reverse sm:text-right";
export const postNavigationMediaClasses = "aspect-square w-16 shrink-0 rounded-xl md:w-20";
export const postNavigationCopyClasses = "min-w-0 flex-1";
export const postNavigationCopyNextClasses = "sm:items-end";
export const postNavigationDirectionClasses: Partial<Record<CIconName, string>> = {
	arrowLeft: "flex items-center justify-start gap-2",
	arrowRight: "flex items-center justify-end gap-2",
};
export const postNavigationTitleClasses = "font-semibold";
export const postNavigationSummaryClasses = "line-clamp-2";
