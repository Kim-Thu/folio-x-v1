import type {
	PCardColumns,
	PCardGap,
	PCardTemplate,
} from "@/types/components/object/project/card/PCard.types";

export interface PCardSkeletonProps {
	count: number;
	template?: PCardTemplate;
	columns?: PCardColumns;
	gap?: PCardGap;
}
