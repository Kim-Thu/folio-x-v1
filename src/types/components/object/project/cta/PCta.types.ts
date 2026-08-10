import type { CFeatureData } from "@/types/components/object/component/CFeature.types";
import type { CSubscriptionFormProps } from "@/types/components/object/component/CSubscriptionForm.types";

export interface PCtaData {
	id: string;
	title: string;
	description?: string;
	action?: {
		href: string;
		label: string;
	};
	form?: CSubscriptionFormProps;
	image?: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	features?: {
		items: CFeatureData[];
	};
	price?: {
		current: string;
		period: string;
		previous?: string;
	};
}

export type PCtaTemplate =
	| "default"
	| "callout"
	| "media-pricing"
	| "inline"
	| "subscription";

export interface PCtaProps {
	data: PCtaData;
	template?: PCtaTemplate;
}
