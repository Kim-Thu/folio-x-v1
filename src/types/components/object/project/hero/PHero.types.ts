import type { CButtonLinkProps } from "@/types/components/object/component/CButton.types";
import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";

export interface PHeroData {
	id: string;
	eyebrow: string;
	title: readonly string[];
	accent?: string;
	description: string;
	actions: CButtonLinkProps[];
	socialLinks?: Array<{
		href: string;
		label: string;
		icon: CIconName;
	}>;
	image: CImageData;
	scrollLabel?: string;
}

export interface PHeroProps {
	data: PHeroData;
	template?: "split-media";
}
