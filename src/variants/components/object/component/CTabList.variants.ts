export const tabListClasses =
	"flex min-w-0 flex-nowrap items-center overflow-x-auto overscroll-x-contain";

export const tabListAppearanceClasses = {
	default: "w-full gap-2",
	archive: "w-full flex-1 gap-6 lg:w-auto",
	underline:
		"relative w-full gap-6 sm:gap-8 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gray-100",
} as const;

export const tabListButtonClasses = {
	default: "shrink-0",
	archive: "shrink-0",
	underline:
		"shrink-0 px-0 py-4 text-gray-500 aria-selected:bg-transparent aria-selected:text-blue-600 aria-[current=page]:bg-transparent aria-[current=page]:text-blue-600 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-transparent aria-selected:after:bg-blue-600 aria-[current=page]:after:bg-blue-600",
} as const;
