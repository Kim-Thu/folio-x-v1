import type { SectionTheme, SectionVariant, SectionVariantConfig } from "@/types/ui";
import { twJoin } from "@/utils/cn";

const themeClasses: Record<SectionTheme, string> = {
	dark: "bg-surface-dark",
	light: "bg-surface-light text-on-light",
	accent: "bg-brand text-on-brand",
	none: "",
};

const variantConfig: Record<SectionVariant, SectionVariantConfig> = {
	default: { theme: "light", spacing: true, trackProgress: true, classes: "" },
	hero: { theme: "dark", spacing: false, trackProgress: true, classes: "relative h-dvh overflow-hidden" },
	callout: { theme: "light", spacing: false, trackProgress: true, classes: "py-3xl md:py-xl lg:py-2xl" },
	state: { theme: "light", spacing: false, trackProgress: false, classes: "min-h-dvh" },
	closing: {
		theme: "dark",
		spacing: false,
		trackProgress: false,
		classes: "relative border-t-hairline border-line-dark pt-3xl md:pt-5xl lg:pt-6xl",
	},
	content: { theme: "none", spacing: false, trackProgress: false, classes: "py-xl" },
};

export function getSectionVariantConfig(variant: SectionVariant): SectionVariantConfig {
	return variantConfig[variant];
}

export function getSectionClasses(
	theme: SectionTheme,
	spacing: boolean,
	variantClasses: string,
): string {
	return twJoin(
		"scroll-mt-20 md:scroll-mt-24",
		spacing && "py-3xl md:py-5xl lg:py-6xl",
		themeClasses[theme],
		variantClasses,
	);
}
