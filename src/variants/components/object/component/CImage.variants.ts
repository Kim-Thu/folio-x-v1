import type {
	CImagePosition,
	CImageVariant,
} from "@/types/components/object/component/CImage.types";

export const imageBaseClasses = "block w-full";

export const imageVariantClasses: Record<CImageVariant, string> = {
	natural: "h-auto",
	cover: "aspect-video object-cover",
	fill: "h-full object-cover",
	"payment-logo": "h-9 w-auto",
	"background-contain": "absolute inset-0 h-full object-contain",
};

export const imagePositionClasses: Record<CImagePosition, string> = {
	center: "object-center",
	top: "object-top",
};
