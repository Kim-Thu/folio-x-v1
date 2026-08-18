import type { CColumnsTemplate } from "@/types/components/object/component/CColumns.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { CSliderControls } from "@/types/components/object/component/CSlider.types";

export type PGalleryTemplate = "grid" | "slider";
export type PGalleryGridColumns = Extract<
	CColumnsTemplate,
	"two" | "three" | "four" | "five"
>;

export interface PGalleryItem extends CImageData {}

export interface PGalleryProps {
	items: PGalleryItem[];
	label: string;
	columns?: PGalleryGridColumns;
	visibleCount?: number;
	viewMoreLabel?: string;
	previousLabel?: string;
	nextLabel?: string;
	sliderControls?: CSliderControls;
	thumbnailLabel?: string;
	template?: PGalleryTemplate;
}
