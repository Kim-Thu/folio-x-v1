export const tabListClasses =
	"flex min-w-0 flex-nowrap items-center overflow-x-auto overscroll-x-contain";

export const tabListAppearanceClasses = {
	default: "w-full gap-2",
	archive: "w-full flex-1 gap-6 lg:w-auto",
	underline:
		"relative w-full gap-8 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gray-100",
} as const;

export const tabListButtonClasses = {
	default: "",
	archive: "",
	underline:
		"px-0 py-4 text-gray-500 aria-pressed:bg-transparent aria-pressed:text-blue-500 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-transparent aria-pressed:after:bg-blue-500",
} as const;
