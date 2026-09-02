import type {
	CMetadataAlign,
	CMetadataSize,
	CMetadataTone,
} from "@/types/components/object/component/CMetadata.types";

export const metadataBaseClasses = "font-mono uppercase tracking-widest";

export const metadataSizeClasses: Record<CMetadataSize, string> = {
	caption: "text-2xs",
	xs: "text-xs",
};

export const metadataAlignClasses: Record<CMetadataAlign, string> = {
	start: "items-start text-left",
	end: "items-end text-right",
};

export const metadataToneClasses: Record<CMetadataTone, string> = {
	brand: "text-blue-600",
	"on-light": "text-gray-500",
	"on-dark": "text-white",
	"on-dark-subtle": "text-gray-400",
	"on-brand": "text-black",
};

export const metadataItemClasses = "flex items-center";
export const metadataItemContentClasses = "inline-flex items-center gap-1";
export const metadataSeparatorClasses = "";
