import type { SocialLink } from '@/types/navigation/SocialLink';
import type { SocialNavDisplay } from '@/types/navigation/SocialNavDisplay';

export interface SocialNavProps {
  links: SocialLink[];
  variant?: 'rail' | 'footer';
  display?: SocialNavDisplay;
}
