import type { CLogoProps } from "@/types/components/object/component/CLogo.types";
import type { CMenuItem } from "@/types/components/object/component/CMenu.types";

export interface PFooterNavigationGroup {
	id: string;
	label: string;
	items: readonly CMenuItem[];
}

export interface PFooterBrand {
	logo: CLogoProps;
	description: string;
}

export interface PFooterContact {
	label: string;
	email: string;
	locationLabel: string;
	location: string;
}

export interface PFooterProps {
	brand: PFooterBrand;
	columns: readonly PFooterNavigationGroup[];
	contact: PFooterContact;
	legalLinks: readonly CMenuItem[];
	copyright: string;
}
