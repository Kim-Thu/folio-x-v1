import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { CSliderControls } from "@/types/components/object/component/CSlider.types";

export type PGalleryTemplate = "grid" | "slider";

export interface PGalleryItem extends CImageData {}

export interface PGalleryProps {
	items: PGalleryItem[];
	label: string;
	previousLabel?: string;
	nextLabel?: string;
	sliderControls?: CSliderControls;
	template?: PGalleryTemplate;
}
