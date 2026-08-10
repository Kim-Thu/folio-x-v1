import type { CIconName } from "@/types/components/object/component/CIcon.types";

export interface SystemStateAction {
  href: string;
  label: string;
  icon?: CIconName;
}

export interface SystemStateImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SystemStateContent {
  id: string;
  displayCode?: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: SystemStateAction;
  secondaryAction?: SystemStateAction;
  image: SystemStateImage;
  metadataTitle: string;
  metadataDescription: string;
}
