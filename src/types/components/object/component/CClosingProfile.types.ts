import type { CButtonLinkProps } from "@/types/components/object/component/CButton.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";

export interface CClosingProfileData {
	id: string;
	eyebrow: string;
	nameLines: string[];
	roleLabel: string;
	followAction: CButtonLinkProps;
	emailAction: CButtonLinkProps;
	locationLabel: string;
	location: string;
	portrait?: CImageData;
}

export interface CClosingProfileProps { data: CClosingProfileData }
