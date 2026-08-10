export const menuToggleClasses =
	"group relative inline-flex aspect-square items-center justify-center rounded-full p-3 transition-colors";

export const menuToggleToneClasses = {
	dark: "text-white hover:bg-white/10",
	light: "text-black hover:bg-gray-100 aria-expanded:text-white",
} as const;

export const menuToggleCloseIconClasses =
	"invisible absolute group-aria-expanded:visible";

export const menuToggleOpenIconClasses = "group-aria-expanded:invisible";
