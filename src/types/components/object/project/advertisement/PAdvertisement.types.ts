import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";
import type { CSubscriptionFormProps } from "@/types/components/object/component/CSubscriptionForm.types";

export interface PAdvertisementData {
  action: {
    href: string;
    icon?: CIconName;
    label: string;
  };
  description: string;
  form?: CSubscriptionFormProps;
  image: CImageData;
  title: string;
}

export interface PAdvertisementProps {
  data: PAdvertisementData;
  template?: "form-first" | "media-first";
}
