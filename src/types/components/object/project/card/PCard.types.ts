import type { HTMLAttributes } from "astro/types";

import type {
	CCardConfig,
	CCardData,
} from "@/types/components/object/component/card/CCard.types";
import type {
	CSliderBehavior,
	CSliderControls,
} from "@/types/components/object/component/CSlider.types";

export type PCardTemplate =
	| "grid"
	| "list"
	| "three-column"
	| "twelve-column"
	| "content-three-column"
	| "mosaic"
	| "asymmetric"
	| "showcase"
	| "editorial-split"
	| "slider";

export type PCardColumns = 1 | 2 | 3 | 4 | 5;
export type PCardGap = "none" | "sm" | "md" | "lg" | "xl";
export type PCardSeparator = "none" | "light" | "dark";

export interface PCardSliderSettings extends CSliderBehavior {
	controls?: CSliderControls;
}

export interface PCardProps extends Omit<HTMLAttributes<"div">, "class"> {
	template?: PCardTemplate;
	columns?: PCardColumns;
	gap?: PCardGap;
	separator?: PCardSeparator;
	slider?: PCardSliderSettings;
	card?: CCardConfig;
	items: CCardData[];
}

export type PCardTemplateProps = Omit<PCardProps, "template"> & {
	template: PCardTemplate;
};
