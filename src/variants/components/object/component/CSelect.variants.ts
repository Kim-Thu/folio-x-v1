import type { CSelectAppearance } from "@/types/components/object/component/CSelect.types";

export const selectRootClasses = "relative inline-flex shrink-0";

export const selectTriggerBaseClasses =
	"inline-flex shrink-0 cursor-pointer items-center justify-between gap-4 whitespace-nowrap bg-white/80 px-5 py-3 text-sm text-black ring-1 ring-inset ring-gray-100 backdrop-blur-sm transition-colors duration-300 hover:ring-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-100 aria-expanded:ring-gray-100";

export const selectTriggerAppearanceClasses: Record<CSelectAppearance, string> =
	{
		pill: "rounded-full",
		panel: "rounded-2xl",
	};

export const selectIconClasses =
	"pointer-events-none inline-flex shrink-0 origin-center items-center justify-center transition-transform duration-300 group-aria-expanded/select:rotate-180";

export const selectMenuClasses =
	"absolute right-0 top-full z-50 mt-2 min-w-full overflow-hidden rounded-2xl bg-white/90 p-1 ring-1 ring-inset ring-gray-100 backdrop-blur-sm";

export const selectOptionClasses =
	"cursor-pointer rounded-xl px-4 py-2 text-sm text-black outline-none transition-colors duration-300 hover:bg-gray-100 focus:bg-gray-100 aria-selected:bg-black aria-selected:text-gray-100";
