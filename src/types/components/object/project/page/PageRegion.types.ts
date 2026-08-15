import type { LContainerSize } from "@/types/components/layout/LContainer.types";
import type {
	LSectionSpacing,
	LSectionTheme,
} from "@/types/components/layout/LSection.types";
import type { CButtonLinkProps } from "@/types/components/object/component/CButton.types";
import type { CDescriptionListProps } from "@/types/components/object/component/CDescriptionList.types";
import type { CProfileProps } from "@/types/components/object/component/CProfile.types";
import type { CTabListProps } from "@/types/components/object/component/CTabList.types";
import type { CTagsProps } from "@/types/components/object/component/CTags.types";
import type { CTOCProps } from "@/types/components/object/component/CTOC.types";
import type { PAdvertisementProps } from "@/types/components/object/project/advertisement/PAdvertisement.types";
import type { PArticleProps } from "@/types/components/object/project/article/PArticle.types";
import type { PCardProps } from "@/types/components/object/project/card/PCard.types";
import type { PCtaProps } from "@/types/components/object/project/cta/PCta.types";
import type { PEntryIndexProps } from "@/types/components/object/project/entry-index/PEntryIndex.types";
import type { PGalleryProps } from "@/types/components/object/project/gallery/PGallery.types";
import type { PHeroProps } from "@/types/components/object/project/hero/PHero.types";
import type { PPageHeaderProps } from "@/types/components/object/project/page-header/PPageHeader.types";
import type { PPostNavigationProps } from "@/types/components/object/project/post-navigation/PPostNavigation.types";
import type { PReaderProps } from "@/types/components/object/project/reader/PReader.types";
import type { PReviewsProps } from "@/types/components/object/project/reviews/PReviews.types";
import type { PSectionHeaderProps } from "@/types/components/object/project/section-header/PSectionHeader.types";
import type { PStatusProps } from "@/types/components/object/project/status/PStatus.types";
import type { PageArchiveRegion } from "@/types/components/object/project/page/PageArchiveRegion.types";
import type { PageCollectionRegion } from "@/types/components/object/project/page/PageCollectionRegion.types";
import type { PageGroupRegion } from "@/types/components/object/project/page/PageGroupRegion.types";

export type PageRegionContainer = LContainerSize | "none";

export interface PageRegionBase {
	key: string;
	enabled?: boolean;
	placement?: "main" | "aside";
	section?:
		| {
				id?: string;
				theme?: LSectionTheme;
				spacing?: LSectionSpacing;
				container?: PageRegionContainer;
		  }
		| false;
}

export interface PageHeaderRegion extends PageRegionBase {
	component: "page-header";
	props: PPageHeaderProps;
}

export interface HeroRegion extends PageRegionBase {
	component: "hero";
	props: PHeroProps;
}

export interface SectionHeaderRegion extends PageRegionBase {
	component: "section-header";
	props: PSectionHeaderProps;
}

export interface ArticleRegion extends PageRegionBase {
	component: "article";
	props: PArticleProps;
}

export interface ReviewsRegion extends PageRegionBase {
	component: "reviews";
	props: PReviewsProps;
}

export interface CardsRegion extends PageRegionBase {
	component: "cards";
	props: {
		header?: PSectionHeaderProps;
		headerAction?: CButtonLinkProps;
		cards: PCardProps;
		action?: CButtonLinkProps;
		panel?: boolean;
	};
}

export interface CtaRegion extends PageRegionBase {
	component: "cta";
	props: PCtaProps;
}

export interface PostNavigationRegion extends PageRegionBase {
	component: "post-navigation";
	props: PPostNavigationProps;
}

export interface StatusRegion extends PageRegionBase {
	component: "status";
	props: PStatusProps;
}

export interface TabsRegion extends PageRegionBase {
	component: "tabs";
	props: CTabListProps;
}

export interface GalleryRegion extends PageRegionBase {
	component: "gallery";
	props: PGalleryProps;
}

export interface EntryIndexRegion extends PageRegionBase {
	component: "entry-index";
	props: PEntryIndexProps;
}

export interface ReaderRegion extends PageRegionBase {
	component: "reader";
	props: PReaderProps;
}

export interface DetailsRegion extends PageRegionBase {
	component: "details";
	props: {
		title?: string;
		list: CDescriptionListProps;
		tags?: {
			title: string;
			list: CTagsProps;
		};
	};
}

export interface ProfileRegion extends PageRegionBase {
	component: "profile";
	props: CProfileProps;
}

export interface TocRegion extends PageRegionBase {
	component: "toc";
	props: CTOCProps;
}

export interface AdvertisementRegion extends PageRegionBase {
	component: "advertisement";
	props: PAdvertisementProps;
}

export type PageRegion =
	| PageHeaderRegion
	| HeroRegion
	| SectionHeaderRegion
	| ArticleRegion
	| ReviewsRegion
	| CardsRegion
	| CtaRegion
	| PostNavigationRegion
	| PageCollectionRegion
	| PageArchiveRegion
	| StatusRegion
	| TabsRegion
	| GalleryRegion
	| EntryIndexRegion
	| ReaderRegion
	| DetailsRegion
	| ProfileRegion
	| TocRegion
	| AdvertisementRegion
	| PageGroupRegion;

export interface PageRegionProps {
	region: PageRegion;
}
