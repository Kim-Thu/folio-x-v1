import type {
	CLogoSize,
	CLogoTone,
} from "@/types/components/object/component/CLogo.types";

export const logoImageSizeClasses: Record<CLogoSize, string> = {
	sm: "h-6 w-auto",
	md: "h-8 w-auto",
	lg: "h-10 w-auto",
};

export const logoFallbackSizeClasses: Record<CLogoSize, string> = {
	sm: "text-sm",
	md: "text-base",
	lg: "text-3xl",
};

export const logoFallbackToneClasses: Record<CLogoTone, string> = {
	default: "",
	light: "brightness-0 invert",
	dark: "brightness-0",
};
