import type {
	CTextTone,
	CTextVariant,
} from "@/types/components/object/component/CText.types";

export const textVariantClasses: Record<CTextVariant, string> = {
	inherit: "",
	body: "text-base",
	"body-responsive": "text-sm md:text-base",
	"body-sm": "text-sm",
	caption: "font-mono text-xs uppercase tracking-widest",
	label: "font-mono text-xs uppercase tracking-widest",
	lead: "text-2xl leading-snug md:text-3xl",
	price: "text-2xl font-semibold leading-none",
	"price-display": "text-3xl font-semibold leading-none md:text-4xl",
	"price-old": "text-xs line-through",
	reader: "text-lg leading-loose",
	"reader-emphasis": "text-lg italic leading-loose",
	"reader-separator": "font-mono text-base tracking-widest",
};

export const textToneClasses: Record<CTextTone, string> = {
	brand: "text-blue-600",
	inherit: "",
	muted: "text-gray-600",
	subtle: "text-gray-500",
	"on-dark": "text-white",
	"on-dark-muted": "text-gray-300",
	"on-dark-subtle": "text-gray-400",
};
