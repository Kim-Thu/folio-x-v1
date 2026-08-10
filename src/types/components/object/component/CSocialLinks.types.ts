import type {
	CIconName,
	CIconSize,
} from "@/types/components/object/component/CIcon.types";
import type { HTMLAttributes } from "astro/types";

export type CSocialLinksDisplay = "label" | "shortLabel" | "icon";
export type CSocialLinksOrientation = "horizontal" | "vertical";
export type CSocialLinksShape = "default" | "circle" | "square";
export type CSocialLinksGap = "sm" | "md" | "lg" | "xl";

export interface CSocialLink {
	href: string;
	icon?: Extract<CIconName, "github" | "linkedin">;
	label: string;
	shortLabel: string;
}

export interface CSocialLinksProps extends Omit<
	HTMLAttributes<"nav">,
	"aria-label" | "class"
> {
	links: readonly CSocialLink[];
	label: string;
	display?: CSocialLinksDisplay;
	orientation?: CSocialLinksOrientation;
	shape?: CSocialLinksShape;
	size?: CIconSize;
	gap?: CSocialLinksGap;
}
