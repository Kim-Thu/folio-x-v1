import type {
	CHeadingTransform,
	CHeadingVariant,
} from "@/types/components/object/component/CHeading.types";

export const headingBaseClasses = "font-semibold";

export const headingVariantClasses: Record<CHeadingVariant, string> = {
	"display-1": "text-6xl leading-none md:text-8xl lg:text-9xl",
	"display-2": "text-5xl leading-none md:text-7xl lg:text-8xl",
	"display-3": "text-5xl leading-none md:text-6xl lg:text-7xl",
	"page-title": "text-5xl md:text-6xl",
	h1: "text-4xl leading-tight md:text-5xl lg:text-6xl",
	h2: "text-3xl leading-tight md:text-4xl lg:text-5xl",
	h3: "text-2xl leading-snug md:text-3xl",
	h4: "text-xl leading-snug",
	h5: "text-base leading-normal",
	h6: "text-sm leading-normal",
	footer:
		"font-mono text-xs font-normal uppercase tracking-widest text-gray-500",
};

export const headingTransformClasses: Record<CHeadingTransform, string> = {
	none: "normal-case",
	uppercase: "uppercase",
};
