import type { CChoiceGroupAppearance } from "@/types/components/object/component/CChoiceGroup.types";

export const choiceOptionClasses: Record<CChoiceGroupAppearance, string> = {
	controls:
		"group/choice flex cursor-pointer items-center gap-2 text-sm text-gray-500",
	navigation:
		"group/choice relative -mx-4 flex cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-gray-500 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-transparent hover:text-black aria-current:bg-gray-50 aria-current:font-semibold aria-current:text-black aria-current:before:bg-blue-600 aria-[current=page]:bg-gray-50 aria-[current=page]:font-semibold aria-[current=page]:text-black aria-[current=page]:before:bg-blue-600 aria-pressed:bg-gray-50 aria-pressed:font-semibold aria-pressed:text-black aria-pressed:before:bg-blue-600",
};

export const choiceControlClasses: Record<CChoiceGroupAppearance, string> = {
	controls:
		"peer size-5 cursor-pointer appearance-none rounded-sm bg-white ring-1 ring-inset ring-gray-300 checked:bg-blue-600 checked:ring-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
	navigation: "sr-only",
};

export const choiceControlWrapClasses = "relative inline-flex size-5 shrink-0";
export const choiceControlIconClasses =
	"pointer-events-none absolute inset-0 m-auto text-white opacity-0 transition-opacity duration-300 peer-checked:opacity-100";

export const choiceLabelClasses = "flex-1";
export const choiceCountClasses = "font-mono text-xs text-gray-500";
export const choiceNavigationClasses = "grid gap-1";
export const choiceNavigationTitleClasses =
	"mb-2 inline-flex w-full border-b border-gray-100 pb-2 font-mono text-xs uppercase tracking-widest text-black";
