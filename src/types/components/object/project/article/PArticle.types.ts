import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { CFeatureData } from "@/types/components/object/component/CFeature.types";
import type { CContentFlowItem } from "@/types/components/object/component/CContentFlow.types";
import type { CTOCProps } from "@/types/components/object/component/CTOC.types";

export interface PArticleBlock {
	id: string;
	title: string;
	paragraphs: string[];
	image?: CImageData;
	features?: CFeatureData[];
}

export interface PArticleToc
	extends Pick<CTOCProps, "appearance" | "items" | "label" | "sticky"> {
	position?: "start" | "end";
}

export interface PArticleGroupedProps {
	appearance?: "default" | "compact";
	blocks: PArticleBlock[];
	template?: "grouped";
	toc?: PArticleToc;
}

export interface PArticleFlowProps {
	content: CContentFlowItem[];
	template: "flow";
	toc?: PArticleToc;
}

export interface PArticleRichTextProps {
	content: any;
	template: "rich-text";
	toc?: PArticleToc;
}

export type PArticleProps =
	| PArticleGroupedProps
	| PArticleFlowProps
	| PArticleRichTextProps;
