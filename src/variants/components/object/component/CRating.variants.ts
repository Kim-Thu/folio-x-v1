import type {
  CRatingSlots,
  CRatingStyle,
} from "@/types/components/object/component/CRating.types";

export const ratingSlotDefaults: Record<CRatingStyle, CRatingSlots> = {
  compact: {
    control: false,
    count: true,
    maximum: false,
    stars: true,
    value: true,
  },
  filter: {
    control: true,
    count: true,
    maximum: false,
    stars: true,
    value: false,
  },
  score: {
    control: false,
    count: false,
    maximum: true,
    stars: true,
    value: true,
  },
  stars: {
    control: false,
    count: false,
    maximum: false,
    stars: true,
    value: false,
  },
};

export const ratingClasses: Record<CRatingStyle, string> = {
  compact: "inline-flex items-center gap-1 text-xs text-gray-500",
  filter:
    "flex cursor-pointer items-center gap-2 text-gray-500",
  score: "flex flex-wrap items-center gap-2 text-black",
  stars: "inline-flex items-center gap-1 text-yellow-500",
};

export const ratingControlClasses = "sr-only";

export const ratingValueClasses: Record<CRatingStyle, string> = {
  compact: "",
  filter: "sr-only",
  score: "text-4xl font-semibold",
  stars: "sr-only",
};

export const ratingMaximumClasses = "text-gray-600";

export const ratingStarsClasses: Record<CRatingStyle, string> = {
  compact: "inline-flex items-center text-yellow-500",
  filter: "flex flex-1 items-center gap-1 text-yellow-500",
  score: "inline-flex items-center gap-1 text-yellow-500",
  stars: "inline-flex items-center gap-1 text-yellow-500",
};

export const ratingCountClasses = "font-mono text-xs text-gray-500";
