import type { CLogoProps } from "@/types/components/object/component/CLogo.types";
import type {
	CSocialLink,
	CSocialLinksDisplay,
} from "@/types/components/object/component/CSocialLinks.types";
import type { CMenuItem } from "@/types/components/object/component/CMenu.types";

export interface PFooterNavigationGroup {
	id: string;
	label: string;
	items: readonly CMenuItem[];
}

export interface PFooterNewsletter {
	label: string;
	description: string;
	inputLabel: string;
	placeholder: string;
	submitLabel: string;
}

export interface PFooterBrand {
	logo: CLogoProps;
	description: string;
	socialLinks: readonly CSocialLink[];
	socialDisplay?: CSocialLinksDisplay;
}

export interface PFooterProps {
	brand: PFooterBrand;
	columns: readonly PFooterNavigationGroup[];
	newsletter?: PFooterNewsletter;
	socialLabel: string;
	copyright: string;
}
