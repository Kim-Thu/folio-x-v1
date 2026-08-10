import type { CIconName } from "@/types/components/object/component/CIcon.types";

export interface CReactionItem {
	label: string;
	count: string;
	icon: Extract<CIconName, "handThumbUp" | "heart" | "faceSmile" | "faceFrown">;
}

export interface CReactionsProps {
	label: string;
	items: CReactionItem[];
}
