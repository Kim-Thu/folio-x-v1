import type { CBadgeTone } from "@/types/components/object/component/CBadge.types";
import type { CFeatureData } from "@/types/components/object/component/CFeature.types";
import type { CHeadingProps } from "@/types/components/object/component/CHeading.types";
import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { CMediaRatio } from "@/types/components/object/component/CMedia.types";
import type { CMetadataProps } from "@/types/components/object/component/CMetadata.types";

export type CCardTemplate =
	| "stacked"
	| "horizontal"
	| "overlay"
	| "featured"
	| "boxed"
	| "compact-media"
	| "compact-bordered"
	| "editorial"
	| "editorial-list"
	| "icon-panel"
	| "icon-summary"
	| "media-banner"
	| "media-caption"
	| "media-details"
	| "media-only"
	| "media-summary"
	| "media-metrics";

export type CCardAppearance = "default" | "inverse";
export type CCardItemSize = "standard" | "wide";

export interface CCardSlots {
	media: boolean;
	icon: boolean;
	metadata: boolean;
	tags: boolean;
	metrics: boolean;
	title: boolean;
	excerpt: boolean;
	action: boolean;
}

export type CCardSlotOptions = Partial<CCardSlots>;

export interface CCardData {
	href: string;
	ariaLabel: string;
	title: string[];
	excerpt?: string;
	metadata?: CMetadataProps["data"];
	secondaryMetadata?: CMetadataProps["data"];
	media?: CImageData;
	appearance?: CCardAppearance;
	filterValue?: string;
	sortValue?: string;
	size?: CCardItemSize;
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

export interface CCardConfig {
	template?: CCardTemplate;
	mediaRatio?: CMediaRatio;
	headingLevel?: CHeadingProps["level"];
	slots?: CCardSlotOptions;
}

export interface CCardProps extends CCardConfig {
	data: CCardData;
	index?: number;
}

export type CCardTemplateProps = Pick<CCardProps, "data" | "headingLevel" | "index" | "mediaRatio"> & {
	slots: CCardSlots;
};
