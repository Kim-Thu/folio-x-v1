import type { CBadgeTone } from "@/types/components/object/component/CBadge.types";
import type { CFeatureData } from "@/types/components/object/component/CFeature.types";
import type { CHeadingProps } from "@/types/components/object/component/CHeading.types";
import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { CMediaRatio } from "@/types/components/object/component/CMedia.types";
import type { CMetadataProps } from "@/types/components/object/component/CMetadata.types";
import type {
	Insight,
	Lab,
	Product,
	Project,
	PublicationEntry,
} from "@/types/content";

export type CCardTemplate =
	| "stacked"
	| "horizontal"
	| "overlay"
	| "featured"
	| "boxed"
	| "compact-media"
	| "compact-bordered"
	| "editorial"
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
export type CCardSource =
	| "static"
	| "products"
	| "projects"
	| "labs"
	| "blog"
	| "comics"
	| "novels"
	| "publications";

export interface ProductCardPresentation {
	routes: {
		base: string;
		categoryBase?: string;
	};
	ariaLabelPrefix: string;
	imageAltSuffix: string;
	imageWidth: number;
	imageHeight: number;
	categoryDisplay: "text";
	actionHref: string;
	actionLabelPrefix: string;
	actionIcon: CIconName;
	license: "free" | "pro";
}

export interface LabCardPresentation {
	routes: {
		base: string;
		categoryBase?: string;
		technologyBase?: string;
	};
	ariaLabelPrefix: string;
	categoryDisplay: "text";
	completeBadgeTone: CBadgeTone;
	activeBadgeTone: CBadgeTone;
	tagsLabelSuffix: string;
	metricIcons: [CIconName, CIconName, CIconName];
}

export interface PublicationCardPresentation {
	routes: {
		base: string;
		categoryBase?: string;
	};
	ariaLabelPrefix: string;
	categoryDisplay: "text";
	tagsLabelSuffix: string;
	viewsIcon: CIconName;
}

export interface PublicationCollectionPresentation {
	comics: PublicationCardPresentation;
	novels: PublicationCardPresentation;
}

export interface ProjectCardPresentation {
	routes: {
		base: string;
		categoryBase?: string;
		tagBase?: string;
	};
	actionLabel?: string;
	actionIcon?: CIconName;
	separator?: string;
	size?: CCardItemSize;
	tagsLabel?: string;
	lightAppearance?: CCardAppearance;
	darkAppearance?: CCardAppearance;
	metadataDisplay?: "text";
	imageWidth: number;
	imageHeight: number;
}

export interface InsightCardPresentation {
	routes: {
		base: string;
		categoryBase?: string;
		tagBase?: string;
	};
	separator?: string;
	metadataDisplay?: "text";
	tagsLabelSuffix?: string;
	imageWidth: number;
	imageHeight: number;
}

export type CCardPresentation =
	| ProductCardPresentation
	| LabCardPresentation
	| PublicationCardPresentation
	| PublicationCollectionPresentation
	| ProjectCardPresentation
	| InsightCardPresentation;

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

export type CCardItemData =
	| CCardData
	| Product
	| Project
	| Lab
	| Insight
	| PublicationEntry;

export interface CCardConfig {
	template?: CCardTemplate;
	mediaRatio?: CMediaRatio;
	headingLevel?: CHeadingProps["level"];
	slots?: CCardSlotOptions;
	source?: CCardSource;
	presentation?: CCardPresentation;
}

export interface CCardProps extends CCardConfig {
	data: CCardItemData;
	index?: number;
}

export type CCardTemplateProps = Pick<
	CCardProps,
	"headingLevel" | "index" | "mediaRatio" | "presentation" | "source"
> & {
	data: CCardData;
	slots: CCardSlots;
};
