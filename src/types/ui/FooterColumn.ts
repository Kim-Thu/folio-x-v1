import type { NavigationItem, SocialLink } from '@/types/navigation';

export type FooterColumn =
  | {
      kind: 'navigation';
      label: string;
      items: NavigationItem[];
    }
  | {
      kind: 'social';
      label: string;
      links: SocialLink[];
    }
  | {
      kind: 'location';
      label: string;
      location: string;
    };
