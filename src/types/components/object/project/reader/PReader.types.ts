import type { CBreadcrumbData } from "@/types/components/object/component/CBreadcrumb.types";
import type { CButtonLinkProps } from "@/types/components/object/component/CButton.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { CMetadataData } from "@/types/components/object/component/CMetadata.types";
import type { CReactionsProps } from "@/types/components/object/component/CReactions.types";
import type { CShareLinksProps } from "@/types/components/object/component/CShareLinks.types";

export interface PReaderTextItem {
	kind?: "paragraph" | "emphasis" | "separator";
	text: string;
}

export type PReaderContent =
	| { kind: "prose"; items: PReaderTextItem[] }
	| { kind: "sequential-media"; images: CImageData[] };

export interface PReaderData {
	breadcrumb: CBreadcrumbData;
	badge: string;
	title: string;
	metadata: CMetadataData;
	views: string;
	content: PReaderContent;
	actions: {
		label: string;
		index: CButtonLinkProps;
		next?: CButtonLinkProps;
		settingsLabel: string;
		themeLabel: string;
	};
	share: CShareLinksProps;
	reactions: CReactionsProps;
	bookmarkLabel: string;
	navigation: {
		label: string;
		previous?: CButtonLinkProps;
		index: CButtonLinkProps;
		next?: CButtonLinkProps;
	};
}

export interface PReaderProps {
	data: PReaderData;
}
