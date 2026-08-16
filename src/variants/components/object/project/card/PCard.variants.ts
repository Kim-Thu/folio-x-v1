import type { PCardGap } from "@/types/components/object/project/card/PCard.types";

export const cardCarouselClasses =
	"flex snap-x snap-mandatory overflow-x-auto scroll-smooth";

export const cardCarouselGapClasses: Record<PCardGap, string> = {
	none: "gap-0",
	sm: "gap-4",
	md: "gap-6",
	lg: "gap-8",
	xl: "gap-12 lg:gap-16",
};

export const cardCarouselItemClasses =
	"min-w-0 shrink-0 basis-5/6 snap-start sm:basis-1/2 lg:basis-1/3 xl:basis-1/4";
