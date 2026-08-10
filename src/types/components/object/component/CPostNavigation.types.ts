import type { CIconName } from "@/types/components/object/component/CIcon.types";

export interface CPostNavigationItem {
	title: string;
	href: string;
	image: string;
	alt: string;
	label: string;
	summary: string;
	icon: Extract<CIconName, "arrowLeft" | "arrowRight">;
}

export interface CPostNavigationProps {
	items: CPostNavigationItem[];
	label: string;
}
