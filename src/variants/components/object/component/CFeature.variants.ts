import type {
	CFeatureAppearance,
	CFeatureTone,
} from "@/types/components/object/component/CFeature.types";

export const featureClasses = "shrink-0";

export const featureAppearanceClasses: Record<CFeatureAppearance, string> = {
	body: "text-sm",
	caption: "font-mono text-xs uppercase tracking-widest",
};

export const featureToneClasses: Record<CFeatureTone, string> = {
	"on-dark": "text-gray-300",
	"on-light": "text-gray-500",
};
