import type { SocialLink } from '@/types/navigation/SocialLink';

export interface SocialNavProps {
  links: SocialLink[];
  variant?: 'rail' | 'footer';
}
