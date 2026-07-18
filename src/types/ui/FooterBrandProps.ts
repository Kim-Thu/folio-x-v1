import type { SocialLink, SocialNavDisplay } from '@/types/navigation';

export interface FooterBrandProps {
  description: string;
  socialLinks: SocialLink[];
  socialDisplay?: SocialNavDisplay;
}
