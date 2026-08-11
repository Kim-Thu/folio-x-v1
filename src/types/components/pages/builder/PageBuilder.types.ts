import type { CollectionEntry } from "astro:content";
import type { LContainerSize } from "@/types/components/layout/LContainer.types";
import type {
	LSectionSpacing,
	LSectionTheme,
} from "@/types/components/layout/LSection.types";
import type { CButtonLinkProps } from "@/types/components/object/component/CButton.types";
import type { CColumnsGap } from "@/types/components/object/component/CColumns.types";
import type { CDescriptionListProps } from "@/types/components/object/component/CDescriptionList.types";
import type { CTagsProps } from "@/types/components/object/component/CTags.types";
import type { CPaginationProps } from "@/types/components/object/component/CPagination.types";
import type { CProfileProps } from "@/types/components/object/component/CProfile.types";
import type { CTOCProps } from "@/types/components/object/component/CTOC.types";
import type { CTabListProps } from "@/types/components/object/component/CTabList.types";
import type { PAdvertisementProps } from "@/types/components/object/project/advertisement/PAdvertisement.types";
import type { PArchiveToolbarProps } from "@/types/components/object/project/archive-toolbar/PArchiveToolbar.types";
import type { PArticleProps } from "@/types/components/object/project/article/PArticle.types";
import type { PCardProps } from "@/types/components/object/project/card/PCard.types";
import type { PCtaProps } from "@/types/components/object/project/cta/PCta.types";
import type { PFilterPanelProps } from "@/types/components/object/project/filter-panel/PFilterPanel.types";
import type { PPageHeaderProps } from "@/types/components/object/project/page-header/PPageHeader.types";
import type { PPostNavigationProps } from "@/types/components/object/project/post-navigation/PPostNavigation.types";
import type { PReviewsProps } from "@/types/components/object/project/reviews/PReviews.types";
import type { PSectionHeaderProps } from "@/types/components/object/project/section-header/PSectionHeader.types";
import type { PStatementProps } from "@/types/components/object/project/statement/PStatement.types";
import type { PStatusProps } from "@/types/components/object/project/status/PStatus.types";
import type { PEntryIndexProps } from "@/types/components/object/project/entry-index/PEntryIndex.types";
import type { PReaderProps } from "@/types/components/object/project/reader/PReader.types";
import type { PHeroProps } from "@/types/components/object/project/hero/PHero.types";

export type PageEntryData = CollectionEntry<"pages">["data"];
export type PageSectionData = PageEntryData["content"]["sections"][number];

export interface PageBuilderContext {
	categorySlug?: string;
	tagSlug?: string;
	technologySlug?: string;
}

export type PageRegionContainer = LContainerSize | "none";

interface PageRegionBase {
	key: string;
	enabled?: boolean;
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

export interface CollectionRegion extends PageRegionBase {
	component: "collection";
	props: {
		template?: "stack" | "split";
		header?: PSectionHeaderProps;
		tabs?: CTabListProps;
		cardGroups: PCardProps[];
		action?: CButtonLinkProps;
		statement?: PStatementProps;
		behavior?: "tabbed";
	};
}

export interface ArchiveRegion extends PageRegionBase {
	component: "archive";
	props: {
		mode: "taxonomy" | "faceted";
		toolbar: PArchiveToolbarProps;
		sidebar?: {
			label: string;
			filter: PFilterPanelProps;
			advertisement?: PAdvertisementProps;
			cards?: PCardProps;
			cardsHeader?: PSectionHeaderProps;
		};
		result?: {
			header?: PSectionHeaderProps;
			count?: number;
			label?: string;
		};
		cards: PCardProps;
		emptyLabel: string;
		pagination: CPaginationProps & {
			pageSize: number;
		};
	};
}

export interface StatusRegion extends PageRegionBase {
	component: "status";
	props: PStatusProps;
}

export interface TabsRegion extends PageRegionBase {
	component: "tabs";
	props: CTabListProps;
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

export interface GroupRegion extends PageRegionBase {
	component: "group";
	props: {
		template: "sidebar";
		asideLabel: string;
		asideGap?: CColumnsGap;
		asidePosition?: "start" | "end";
		gap?: CColumnsGap;
		panel?: boolean;
		stickyAside?: boolean;
		toolbar?: PArchiveToolbarProps;
		regions: PageRegion[];
	};
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
	| CollectionRegion
	| ArchiveRegion
	| TabsRegion
	| EntryIndexRegion
	| ReaderRegion
	| DetailsRegion
	| ProfileRegion
	| TocRegion
	| AdvertisementRegion
	| GroupRegion
	| StatusRegion;

export interface PageBuilderProps {
	page: PageEntryData;
	context?: PageBuilderContext;
}

export interface PageRegionProps {
	region: PageRegion;
}
