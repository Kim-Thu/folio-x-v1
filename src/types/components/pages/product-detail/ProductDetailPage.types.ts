import type { PArticleBlock } from "@/types/components/object/project/article/PArticle.types";
import type { CTOCItem } from "@/types/components/object/component/CTOC.types";
import type { PPageHeaderGallerySummaryData } from "@/types/components/object/project/page-header/PPageHeader.types";
import type { PReviewsProps } from "@/types/components/object/project/reviews/PReviews.types";
import type { PCardData } from "@/types/components/object/project/card/PCard.types";
import type { PCtaData } from "@/types/components/object/project/cta/PCta.types";
import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";

export interface ProductDetailPageSource {
	pageHeader: PPageHeaderGallerySummaryData;
	article: {
		label: string;
		blocks: PArticleBlock[];
		tableOfContents: CTOCItem[];
	};
	reviews: PReviewsProps;
	related: {
		eyebrow: string;
		title: string;
		items: PCardData[];
	};
	support: PCtaData;
}

export interface ProductDetailPageData {
	product: {
		title: string;
		description: string;
	};
	builder: PageBuilderConfig;
}

export interface ProductDetailPageProps {
	data: ProductDetailPageData;
}
