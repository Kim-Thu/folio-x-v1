import type { HTMLAttributes } from "astro/types";
import type { CIconName } from "@/types/components/object/component/CIcon.types";

export interface CDescriptionListItem {
	label: string;
	value: string;
	href?: string;
	icon?: CIconName;
}

export type CDescriptionListVariant =
	| "default"
	| "panel"
	| "facts"
	| "metrics"
	| "highlights"
	| "compact";

export interface CDescriptionListProps
	extends Omit<HTMLAttributes<"dl">, "class"> {
	class?: string;
	items: CDescriptionListItem[];
	variant?: CDescriptionListVariant;
	tone?: "on-light" | "on-dark";
}
