import type { CLogoProps } from "@/types/components/object/component/CLogo.types";
import type { CMenuItem } from "@/types/components/object/component/CMenu.types";

export interface PHeaderNavigation {
	items: readonly CMenuItem[];
	desktopLabel: string;
	mobileLabel: string;
}

export interface PHeaderAction {
	href: string;
	label: string;
	mobileLabel?: string;
}

export interface PHeaderMenuControl {
	openLabel: string;
	closeLabel: string;
}

export interface PHeaderProps {
	action: PHeaderAction;
	logo: CLogoProps;
	menuControl: PHeaderMenuControl;
	navigation: PHeaderNavigation;
	tone?: "dark" | "light";
}
