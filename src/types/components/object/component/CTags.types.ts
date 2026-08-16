import type {
	CBadgeAppearance,
	CBadgeTone,
} from "@/types/components/object/component/CBadge.types";

export interface CTagData {
	href?: string;
	label: string;
}

export interface CTagsProps {
	appearance?: CBadgeAppearance;
	items: readonly CTagData[];
	label: string;
	tone?: CBadgeTone;
}
