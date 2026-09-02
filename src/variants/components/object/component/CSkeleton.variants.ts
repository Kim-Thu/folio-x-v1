import type {
	CSkeletonVariant,
	CSkeletonWidth,
} from "@/types/components/object/component/CSkeleton.types";

export const cSkeletonBaseClasses = "block animate-pulse bg-gray-10/70";

export const cSkeletonVariantClasses: Record<CSkeletonVariant, string> = {
	line: "h-4 rounded-full",
	media: "aspect-[4/3] rounded-md",
	block: "h-24 rounded-md",
};

export const cSkeletonWidthClasses: Record<CSkeletonWidth, string> = {
	full: "w-full",
	medium: "w-2/3",
	short: "w-1/3",
};
