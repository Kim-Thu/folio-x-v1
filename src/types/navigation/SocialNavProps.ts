import type { SocialLink } from './SocialLink';

export interface SocialNavProps {
  links: SocialLink[];
  variant?: 'rail' | 'footer';
}
