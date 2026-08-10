import type {
	CIconName,
	CIconSize,
} from "@/types/components/object/component/CIcon.types";

export type CIconTileSize = "sm" | "md";
export type CIconTileTone = "brand" | "neutral";

export interface CIconTileProps {
	icon: CIconName;
	iconSize?: CIconSize;
	size?: CIconTileSize;
	tone?: CIconTileTone;
}
