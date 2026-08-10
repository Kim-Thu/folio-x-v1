import type { CIconName } from "@/types/components/object/component/CIcon.types";

export interface CShareLink {
	href: string;
	icon: Extract<CIconName, "facebook" | "link" | "linkedin" | "twitter">;
	label: string;
}

export interface CShareLinksProps {
	label: string;
	links: readonly CShareLink[];
}
