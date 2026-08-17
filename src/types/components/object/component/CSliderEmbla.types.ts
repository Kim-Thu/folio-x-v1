import type { ReactNode } from "react";

import type { CSliderBehavior } from "@/types/components/object/component/CSlider.types";

export interface CSliderEmblaProps extends Required<CSliderBehavior> {
	children: ReactNode;
	containerClassName: string;
	label: string;
	viewportClassName: string;
}
