export const headerClasses =
	"fixed inset-x-0 top-0 z-40 transition-all duration-300";

export const headerToneClasses = {
	dark: "text-white data-[scroll-surface=solid]:bg-black/80 data-[scroll-surface=solid]:backdrop-blur-header",
	light: "text-black data-[scroll-surface=solid]:bg-white/40 data-[scroll-surface=solid]:backdrop-blur-header",
} as const;

export const headerContentClasses =
	"relative z-50 flex items-center justify-between py-4";
