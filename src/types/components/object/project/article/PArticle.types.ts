import type { CContentFlowItem } from "@/types/components/object/component/CContentFlow.types";
import type { CTOCProps } from "@/types/components/object/component/CTOC.types";

export interface PArticleToc
	extends Pick<CTOCProps, "appearance" | "items" | "label" | "sticky"> {
	position?: "start" | "end";
}

export interface PArticleDocumentProps {
	content: string;
	template?: never;
	toc?: PArticleToc;
}

export interface PArticleFlowProps {
	content: CContentFlowItem[];
	template: "flow";
	toc?: PArticleToc;
}

export type PArticleProps = PArticleDocumentProps | PArticleFlowProps;
