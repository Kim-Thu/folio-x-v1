export const headerClasses =
	"inset-x-0 top-0 z-40 transition-all duration-300";

export const headerPositionClasses = {
	overlay: "fixed",
	solid: "sticky",
} as const;

export const headerSolidClasses = "backdrop-blur-xs";

export const headerSolidToneClasses = {
	dark: "bg-black/80",
	light: "bg-white/90",
} as const;

export const headerToneClasses = {
	dark: "text-white",
	light: "text-black",
} as const;

export const headerContentClasses =
	"relative z-50 flex items-center justify-between py-4";
