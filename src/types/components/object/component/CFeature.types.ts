import type { CIconName } from "@/types/components/object/component/CIcon.types";

export type CFeatureAppearance = "body" | "caption";
export type CFeatureTone = "on-dark" | "on-light";

export interface CFeatureData {
	icon?: CIconName;
	label: string;
}

export interface CFeatureProps extends CFeatureData {
	appearance?: CFeatureAppearance;
	class?: string;
	tone?: CFeatureTone;
}
