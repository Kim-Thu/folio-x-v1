import type { CImageData } from "@/types/components/object/component/CImage.types";

export interface CProfileProps {
	action?: {
		href: string;
		label: string;
	};
	bio?: string;
	image?: CImageData;
	label: string;
	name: string;
	role?: string;
}
