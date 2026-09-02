import type { PFooterProps } from "@/types/components/object/project/footer/PFooter.types";
import type { PHeaderProps } from "@/types/components/object/project/header/PHeader.types";
import type { PClosingProfileProps } from "@/types/components/object/project/closing-profile/PClosingProfile.types";
import type { PLoadingScreenProps } from "@/types/components/object/project/loading-screen/PLoadingScreen.types";
import type {
	SeoPageData,
	SeoSiteIdentity,
} from "@/types/components/object/project/seo/PSeo.types";

export interface BaseLayoutProps {
	title: string;
	description: string;
	language?: string;
	hasOverlayHeader?: boolean;
	tone?: "dark" | "light";
	seo?: SeoPageData;
	seoSite: SeoSiteIdentity;
	header: Omit<PHeaderProps, "solid">;
	footer: PFooterProps;
	closingProfile: PClosingProfileProps;
	loadingScreen: PLoadingScreenProps;
	skipToContent: string;
	backToTop: string;
}
