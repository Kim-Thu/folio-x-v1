import type {
	CImageData,
	CImageVariant,
} from "@/types/components/object/component/CImage.types";
import type { CMediaRatio } from "@/types/components/object/component/CMedia.types";
import type { CSliderControls } from "@/types/components/object/component/CSlider.types";
import type {
	CTextTone,
	CTextVariant,
} from "@/types/components/object/component/CText.types";

export type PGalleryTemplate = "grid" | "slider";

export interface PGalleryItem extends CImageData {
	caption?: string;
}

export interface PGalleryProps {
	items: PGalleryItem[];
	label: string;
	previousLabel?: string;
	nextLabel?: string;
	sliderControls?: CSliderControls;
	template?: PGalleryTemplate;
	mediaRatio?: CMediaRatio;
	imageVariant?: CImageVariant;
	captionVariant?: CTextVariant;
	captionTone?: CTextTone;
}
