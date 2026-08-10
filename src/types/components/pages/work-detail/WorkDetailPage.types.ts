import type { PPageHeaderSliderAsideData } from "@/types/components/object/project/page-header/PPageHeader.types";
import type { PArticleBlock } from "@/types/components/object/project/article/PArticle.types";
import type { PPostNavigationItem } from "@/types/components/object/project/post-navigation/PPostNavigation.types";
import type { PReviewsProps } from "@/types/components/object/project/reviews/PReviews.types";
import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface WorkDetailPageSource {
	pageHeader: PPageHeaderSliderAsideData;
	labels: {
		onThisPage: string;
		previous: string;
		next: string;
	};
	tableOfContents: Array<{ label: string; href: string }>;
	articleBlocks: PArticleBlock[];
	reviews: PReviewsProps;
	navigation: PPostNavigationItem[];
}

export interface WorkDetailPageData {
	project: {
		title: string;
		summary: string;
	};
	builder: PageBuilderConfig;
}

export interface WorkDetailPageProps {
	data: WorkDetailPageData;
}
