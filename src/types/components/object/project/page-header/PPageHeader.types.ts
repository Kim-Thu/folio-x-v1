import type { CBreadcrumbData } from "@/types/components/object/component/CBreadcrumb.types";
import type { CDescriptionListItem } from "@/types/components/object/component/CDescriptionList.types";
import type { CFeatureData } from "@/types/components/object/component/CFeature.types";
import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { CShareLinksProps } from "@/types/components/object/component/CShareLinks.types";
import type { CButtonLinkProps } from "@/types/components/object/component/CButton.types";

export type PPageHeaderTemplate =
  | "editorial"
  | "immersive"
  | "split-media"
  | "slider-aside"
  | "split-benefits"
  | "gallery-summary"
  | "media-aside"
  | "cover-summary";

export interface PPageHeaderCoverSummaryData {
  breadcrumb: CBreadcrumbData;
  cover: CImageData;
  trailer?: CButtonLinkProps;
  tags: Array<{ label: string; href?: string }>;
  tagsLabel: string;
  title: string;
  badge?: string;
  author: { label: string; name: string; href?: string };
  metrics: CDescriptionListItem[];
  actionsLabel: string;
  actions: CButtonLinkProps[];
  description: string[];
  facts: { title: string; items: CDescriptionListItem[] };
  share?: CShareLinksProps;
}

export interface PPageHeaderImmersiveData {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  actionsLabel: string;
  actions: CButtonLinkProps[];
  image: CImageData;
  quote?: string;
  quoteCredit?: string;
  metrics: CDescriptionListItem[];
  slides?: Array<{
    title: string;
    accent: string;
    description: string;
    actions: CButtonLinkProps[];
    image: CImageData;
    quote?: string;
    quoteCredit?: string;
  }>;
}

export interface PPageHeaderEditorialData {
  breadcrumb: CBreadcrumbData;
  category: {
    label: string;
    href: string;
  };
  title: string;
  description: string;
  author: string;
  authorImage?: CImageData;
  publishedAt: string;
  publishedLabel: string;
  readTime: string;
  image: CImageData;
  share?: CShareLinksProps;
}

export interface PPageHeaderSplitBenefitsData {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  benefits: {
    items: CFeatureData[];
  };
  image: CImageData;
}

export interface PPageHeaderSplitMediaData {
  breadcrumb: CBreadcrumbData;
  title: readonly string[];
  description: string;
  image?: CImageData;
}

export interface PPageHeaderSliderAsideData {
  backAction?: {
    label: string;
    href: string;
  };
  category: {
    label: string;
    href: string;
  };
  title: string;
  description: string;
  images: CImageData[];
  mediaTemplate: "grid" | "slider";
  galleryLabel: string;
  previousImageLabel: string;
  nextImageLabel: string;
  tagsLabel: string;
  actionsLabel: string;
  tags: Array<{
    label: string;
    href: string;
  }>;
  actions: Array<{
    kind: "live" | "source";
    label: string;
    href: string;
    icon: CIconName;
  }>;
  asideDecoration: CImageData;
  facts: Array<{
    label: string;
    value: string;
    href?: string;
  }>;
}

export interface PPageHeaderGallerySummaryData {
  breadcrumb: CBreadcrumbData;
  category: {
    label: string;
    href: string;
  };
  title: string;
  description: string;
  badge?: string;
  images: CImageData[];
  galleryLabel: string;
  thumbnailLabel: string;
  rating: {
    value: number;
    maximum: number;
    count: number;
    salesLabel: string;
  };
  price: {
    current: string;
    previous?: string;
    discount?: string;
  };
  features: CFeatureData[];
  facts: CDescriptionListItem[];
  actionsLabel: string;
  actions: Array<{
    label: string;
    href: string;
    icon: CIconName;
    variant: "primary" | "outline";
  }>;
  paymentLabel: string;
  paymentMethods: CImageData[];
}

export interface PPageHeaderMediaAsideData {
  breadcrumb: CBreadcrumbData;
  image: CImageData;
  category?: {
    label: string;
    href: string;
  };
  badge?: string;
  title: string;
  description: string;
  metrics: CFeatureData[];
  tags?: string[];
  actionsLabel: string;
  actions: Array<{
    label: string;
    href: string;
    icon: CIconName;
    variant: "primary" | "outline";
  }>;
  share?: CShareLinksProps;
}

export type PPageHeaderProps =
  | {
      data: PPageHeaderEditorialData;
      template: "editorial";
    }
  | {
      data: PPageHeaderImmersiveData;
      template: "immersive";
    }
  | {
      data: PPageHeaderSplitBenefitsData;
      template: "split-benefits";
    }
  | {
      data: PPageHeaderSplitMediaData;
      template?: "split-media";
    }
  | {
      data: PPageHeaderSliderAsideData;
      template: "slider-aside";
    }
  | {
      data: PPageHeaderGallerySummaryData;
      template: "gallery-summary";
    }
  | {
      data: PPageHeaderMediaAsideData;
      template: "media-aside";
    }
  | {
      data: PPageHeaderCoverSummaryData;
      template: "cover-summary";
    };
