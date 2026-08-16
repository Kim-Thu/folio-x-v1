import type {
	CFeatureAppearance,
	CFeatureTone,
} from "@/types/components/object/component/CFeature.types";

export const featureClasses = "shrink-0";

export const featureAppearanceClasses: Record<CFeatureAppearance, string> = {
	body: "text-sm",
	caption: "font-mono text-xs uppercase tracking-widest",
};

export const featureIconClasses: Record<CFeatureAppearance, string> = {
	body: "inline-flex size-5 shrink-0 items-center justify-center rounded-sm ring-1 ring-inset ring-gray-300",
	caption: "inline-flex shrink-0",
};

export const featureToneClasses: Record<CFeatureTone, string> = {
	"on-dark": "text-gray-300",
	"on-light": "text-gray-500",
};
