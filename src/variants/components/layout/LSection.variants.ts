import type {
	LSectionSpacing,
	LSectionTheme,
} from "@/types/components/layout/LSection.types";

export const sectionBaseClass = "";

export const sectionThemeClasses: Record<LSectionTheme, string> = {
	dark: "bg-black text-white",
	light: "bg-white text-black",
	canvas: "bg-white text-black",
	accent: "bg-blue-600 text-black",
	none: "",
};

export const sectionSpacingClasses: Record<LSectionSpacing, string> = {
	compact: "py-8 md:py-12",
	default: "py-16 md:py-24 lg:py-32",
	none: "",
	lead: "pt-24 pb-8 md:pt-28 md:pb-12",
	body: "pb-16 md:pb-24",
	closing: "pb-12",
};
