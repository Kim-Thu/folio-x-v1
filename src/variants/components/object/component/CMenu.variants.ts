import type {
	CMenuTone,
	CMenuVariant,
} from "@/types/components/object/component/CMenu.types";

export const menuClasses: Record<CMenuVariant, string> = {
	desktop:
		"flex items-center gap-8 text-xs font-medium",
	mobile: "flex flex-col",
	footer: "flex flex-col gap-3 text-sm text-gray-300",
};

export const menuToneClasses: Record<CMenuTone, string> = {
	dark: "text-gray-300",
	light: "text-gray-500",
};

export const menuItemClasses: Record<CMenuVariant, string> = {
	desktop: "",
	mobile: "border-b border-white/10",
	footer: "",
};

export const menuLinkClasses: Record<CMenuVariant, string> = {
	desktop: "transition-colors hover:text-blue-600",
	mobile:
		"mobile-link flex items-center justify-between py-5 text-4xl font-semibold text-white md:text-5xl",
	footer: "inline-flex transition-colors hover:text-white",
};

export const menuIndexClasses = "font-mono text-xs text-gray-500";
