import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { HTMLAttributes } from "astro/types";

export interface CImageGalleryProps
	extends Omit<HTMLAttributes<"div">, "class"> {
	class?: string;
	images: CImageData[];
	label: string;
	thumbnailLabel: string;
}
