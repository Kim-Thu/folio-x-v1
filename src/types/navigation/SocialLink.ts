import type { SocialIconName } from '@/types/navigation/SocialIconName';

export interface SocialLink {
  href: string;
  label: string;
  shortLabel: string;
  icon?: SocialIconName;
}
