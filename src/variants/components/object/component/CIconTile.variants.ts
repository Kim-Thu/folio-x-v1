import type {
	CIconTileSize,
	CIconTileTone,
} from "@/types/components/object/component/CIconTile.types";

export const iconTileBaseClasses =
	"inline-flex shrink-0 items-center justify-center rounded-xl";

export const iconTileSizeClasses: Record<CIconTileSize, string> = {
	sm: "size-10",
	md: "size-12",
};

export const iconTileToneClasses: Record<CIconTileTone, string> = {
	brand: "bg-gray-50 text-blue-600",
	neutral: "bg-gray-50 text-gray-500",
};
