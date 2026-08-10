import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { CLogoProps } from "@/types/components/object/component/CLogo.types";

export interface CLoadingScreenData {
	label: string;
	status: string;
	tips?: string[];
	holdOpen?: boolean;
	progressLabel: string;
	image?: CImageData;
}

export interface CLoadingScreenProps {
	data: CLoadingScreenData;
	logo: Omit<CLogoProps, "size" | "tone">;
}
