import type {
	CMediaPlacement,
	CMediaRatio,
	CMediaShape,
	CMediaSize,
} from "@/types/components/object/component/CMedia.types";

export const mediaBaseClasses = "relative min-w-0 overflow-hidden";

export const mediaShapeClasses: Record<CMediaShape, string> = {
	none: "",
	card: "rounded-md",
	circle: "rounded-full",
};

export const mediaRatioClasses: Record<CMediaRatio, string> = {
	editorial: "aspect-video",
	landscape: "aspect-4/3",
	natural: "",
	panoramic: "aspect-3/1",
	portrait: "aspect-2/3",
	square: "aspect-square",
	video: "aspect-video",
};

export const mediaSizeClasses: Record<CMediaSize, string> = {
	auto: "",
	compact: "w-20 shrink-0",
	thumbnail: "size-16 shrink-0",
};

export const mediaLinkClasses = "block size-full";

export const mediaPlacementClasses: Record<CMediaPlacement, string> = {
	flow: "",
	background: "absolute inset-0 size-full",
};
