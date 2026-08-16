import type { HTMLAttributes } from "astro/types";

import type { CHeadingProps } from "@/types/components/object/component/CHeading.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { CMetadataProps } from "@/types/components/object/component/CMetadata.types";
import type { CBadgeTone } from "@/types/components/object/component/CBadge.types";
import type { CFeatureData } from "@/types/components/object/component/CFeature.types";
import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { CMediaRatio } from "@/types/components/object/component/CMedia.types";
import type { CColumnsTemplate } from "@/types/components/object/component/CColumns.types";

export type PCardTemplate =
  "stacked" | "horizontal" | "overlay" | "featured" | "boxed" | "compact-media" | "compact-bordered" | "editorial" | "icon-panel" | "icon-summary" | "media-banner" | "media-caption" | "media-details" | "media-only" | "media-summary" | "media-metrics";

export type PCardLayout =
  "grid" | "list" | "three-column" | "twelve-column" | "content-three-column" | "mosaic" | "asymmetric" | "showcase" | "carousel";

export type PCardColumns = 1 | 2 | 3 | 4 | 5;

export type PCardGap = "none" | "sm" | "md" | "lg" | "xl";

export type PCardAppearance = "default" | "inverse";
export type PCardSeparator = "none" | "light" | "dark";
export type PCardItemSize = "standard" | "wide";

export interface PCardSlots {
  media: boolean;
  icon: boolean;
  metadata: boolean;
  tags: boolean;
  metrics: boolean;
  title: boolean;
  excerpt: boolean;
  action: boolean;
}

export type PCardSlotOptions = Partial<PCardSlots>;

export interface PCardData {
  href: string;
  ariaLabel: string;
  title: string[];
  excerpt?: string;
  metadata?: CMetadataProps["data"];
  secondaryMetadata?: CMetadataProps["data"];
  media?: CImageData;
  appearance?: PCardAppearance;
  filterValue?: string;
  sortValue?: string;
  size?: PCardItemSize;
  supportingLabel?: string;
  icon?: CIconName;
  badge?: {
    label: string;
    tone?: CBadgeTone;
  };
  metrics?: CFeatureData[];
  rating?: {
    value: number;
    count?: number;
  };
  facets?: Record<string, string[]>;
  searchValue?: string;
  product?: {
    badge?: string;
    category: string;
    categorySlug: string;
    license: "free" | "pro";
    oldPrice?: number;
    platform: string;
    price: number;
    rating: number;
    reviews: number;
  };
  tags?: Array<{ label: string; href?: string }>;
  tagsLabel?: string;
  action?: {
    label: string;
    href: string;
    icon?: CIconName;
    iconPosition?: "start" | "end";
  };
}

export interface PCardProps extends Omit<HTMLAttributes<"div">, "class"> {
  template?: PCardTemplate;
  layout?: PCardLayout;
  columns?: PCardColumns;
  gap?: PCardGap;
  mediaRatio?: CMediaRatio;
  items: PCardData[];
  headingLevel?: CHeadingProps["level"];
  separator?: PCardSeparator;
  slots?: PCardSlotOptions;
}

export type PCardItemProps = Pick<PCardProps, "headingLevel" | "mediaRatio"> & {
  data: PCardData;
  headingLevel?: CHeadingProps["level"];
  index?: number;
  slots: PCardSlots;
};

export type PCardItemTemplateComponent = typeof import("@/components/object/project/card/templates/CardStacked.astro").default;

export interface PCardCollectionTemplateProps extends Omit<HTMLAttributes<"div">, "class"> {
  CardTemplate: PCardItemTemplateComponent;
  items: PCardData[];
  columns: PCardColumns;
  columnsTemplate?: CColumnsTemplate;
  gap: PCardGap;
  mediaRatio?: CMediaRatio;
  headingLevel: CHeadingProps["level"];
  separator: PCardSeparator;
  slots: PCardSlots;
  productGrid?: boolean;
}
